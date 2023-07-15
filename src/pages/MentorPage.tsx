import React, { useState, useEffect, useReducer } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import { Input } from '@windmill/react-ui'
import Spinner from 'components/Spinner/Spinner'
import { fetchMentors } from 'features/mentor/fetchMentors'
import { selectMentors } from 'features/mentor/mentorSlice'
import { useAppDispatch, useAppSelector } from 'app/hook'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import DefaultAvatar from 'assets/img/unnamed.png'
import { Icons } from 'icons'
import { Mentor } from 'models'
import { toast } from 'react-toastify'
import { lockMentor } from 'features/mentor/lockMentor'
import { unlockMentor } from 'features/mentor/unlockMentor'

const { ViewIcon, LockIcon, UnlockIcon } = Icons
function MentorPage() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  // const [isAsc, setIsAsc] = useState(true)
  const dispatch = useAppDispatch()
  const { mentors } = useAppSelector(selectMentors)

  useEffect(() => {
    dispatch(fetchMentors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = mentors
  console.log(mentors)
  dataTable = dataTable.filter((mentor: Mentor) => {
    return (
      mentor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      mentor.email.toLowerCase().includes(searchEmail.toLowerCase())
    )
  })

  dataTable = dataTable.slice().sort((a: any, b: any) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = mentors.length

  dataTable = dataTable.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  )

  // pagination change control
  function onPageChangeTable2(p: any) {
    setPageTable(p)
  }

  // function onSortChange() {
  //   setIsAsc(!isAsc)
  // }

  async function handleLockUser(user: Mentor) {
    if (user.isActive) {
      const actionResult = await dispatch(lockMentor(user.id))
      if (lockMentor.fulfilled.match(actionResult)) {
        toast.success('Khóa thành công')
      } else {
        toast.error('Khóa thất bại')
      }
    } else {
      const actionResult = await dispatch(unlockMentor(user.id))
      if (unlockMentor.fulfilled.match(actionResult)) {
        toast.success('Mở khóa thành công')
      } else {
        toast.error('Mở khóa thất bại')
      }
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Quản lý mentors</PageTitle>
        <div className="my-6">
          <Link to="/mentors/candidates">
            <Button>Duyệt mentor</Button>
          </Link>
        </div>
      </div>
      <div className="flex mb-4">
        <Input
          className="mr-4"
          aria-label="Bad"
          placeholder="Họ tên"
          css=""
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          aria-label="Bad"
          placeholder="Email"
          css=""
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {mentors.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Xác minh (eKYC)</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((user: Mentor, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-3 md:block"
                        src={user.avatar || DefaultAvatar}
                        alt="User avatar"
                      />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Mentor
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.email}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type="primary">{user.phone}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      type={user.User_mentor?.isVerified ? 'success' : 'danger'}
                    >
                      {user.User_mentor?.isVerified
                        ? 'Đã xác minh'
                        : 'Chưa xác minh'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={`${user.isActive ? 'success' : 'danger'}`}>
                      {user.isActive ? 'Đang hoạt động' : 'Đã khóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-4">
                      <Link to={`/mentors/${user.id}`}>
                        <Button layout="link" size="small" aria-label="Edit">
                          <ViewIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </Link>

                      {user.isActive ? (
                        <Button
                          layout="link"
                          size="small"
                          aria-label="Delete"
                          onClick={() => handleLockUser(user)}
                        >
                          <LockIcon
                            className="w-5 h-5 text-red-500"
                            aria-hidden="true"
                          />
                        </Button>
                      ) : (
                        <Button
                          layout="link"
                          size="small"
                          aria-label="Delete"
                          onClick={() => handleLockUser(user)}
                        >
                          <UnlockIcon
                            className="w-5 h-5 text-red-500"
                            aria-hidden="true"
                          />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable2}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  )
}

export default MentorPage
