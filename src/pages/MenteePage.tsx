import { Input, Label } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import Spinner from 'components/Spinner/Spinner'
import { fetchAllMentees } from 'features/mentee/fetchAllMentees'
import { fetchMenteeById } from 'features/mentee/fetchMenteeById'
import { lockMentee } from 'features/mentee/lockMentee'
import { selecteMentees } from 'features/mentee/menteeSlice'
import { unlockMentee } from 'features/mentee/unlockMentee'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import PageTitle from '../components/Typography/PageTitle'

import {
  Avatar,
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@windmill/react-ui'
import { MenteeApi } from 'api'
import DefaultAvatar from 'assets/img/unnamed.png'
import Modals from 'components/Modals/Modals'
import { Icons } from 'icons'
import { Mentee } from 'models'

const { ViewIcon, MoneyIcon, LockIcon, UnlockIcon } = Icons
function MenteePage() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  // const [isAsc, setIsAsc] = useState(true)
  const [showTopupModal, setShowTopupModal] = useState(false)
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null)
  const dispatch = useAppDispatch()
  const { mentees } = useAppSelector(selecteMentees)

  useEffect(() => {
    dispatch(fetchAllMentees())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = mentees
  dataTable = dataTable.filter((mentee: Mentee) => {
    return (
      mentee.name.toLowerCase().includes(searchName.toLowerCase()) &&
      mentee.email.toLowerCase().includes(searchEmail.toLowerCase())
    )
  })

  console.log(dataTable)

  // dataTable = dataTable.slice().sort((a: Mentee, b: Mentee) => {
  //   if (isAsc) {
  //     return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //   } else {
  //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   }
  // })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = mentees.length

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

  const TopupModalActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={() => setShowTopupModal(false)}>
          Hủy
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button type="submit" form="topupForm">
          Đồng ý
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          block
          size="large"
          layout="outline"
          onClick={() => setShowTopupModal(false)}
        >
          Hủy
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button block size="large" type="submit" form="topupForm">
          Đồng ý
        </Button>
      </div>
    </>
  )

  async function handleLockUser(user: Mentee) {
    if (user.isActive) {
      const actionResult = await dispatch(lockMentee(user.id))
      if (lockMentee.fulfilled.match(actionResult)) {
        toast.success('Khóa thành công')
      } else {
        toast.error('Khóa thất bại')
      }
    } else {
      const actionResult = await dispatch(unlockMentee(user.id))
      if (unlockMentee.fulfilled.match(actionResult)) {
        toast.success('Mở khóa thành công')
      } else {
        toast.error('Mở khóa thất bại')
      }
    }
  }

  function handleShowTopupModal(mentee: Mentee) {
    setSelectedMentee(mentee)
    setShowTopupModal(true)
  }

  async function handleTopupSubmit(e: any) {
    e.preventDefault()
    if (e.target.amount.value <= 0 || e.target.value > 1000000) {
      return
    }
    if (selectedMentee) {
      try {
        setShowTopupModal(false)
        await MenteeApi.topUpMentee(
          selectedMentee.id,
          Number(e.target.amount.value)
        )
        toast.success(
          `${e.target.amount.value} đã được nạp vào tài khoản ${selectedMentee.name}.`
        )
        dispatch(fetchMenteeById(selectedMentee.id))
      } catch (err) {
        toast.error('Nạp thất bại')
      }
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Quản lý mentee</PageTitle>
        <div className="my-6"></div>
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
      {mentees.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Tokens</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((user: Mentee, i: number) => (
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
                          Mentee
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
                    <span className="text-sm">{user.coin}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.isActive ? 'success' : 'danger'}>
                      {user.isActive ? 'Đang hoạt động' : 'Đã bị khóa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-1">
                      <Link to={`/mentees/${user.id}`}>
                        <Button layout="link" size="small" aria-label="Edit">
                          <ViewIcon
                            className="w-5 h-5 text-blue-500"
                            aria-hidden="true"
                          />
                        </Button>
                      </Link>
                      <Button
                        layout="link"
                        size="small"
                        aria-label="Edit"
                        onClick={() => handleShowTopupModal(user)}
                      >
                        <MoneyIcon
                          className="w-5 h-5 text-green-500"
                          aria-hidden="true"
                        />
                      </Button>
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
      <Modals
        isOpenModal={showTopupModal}
        header="Nạp Token"
        setClose={() => setShowTopupModal(false)}
        actions={TopupModalActions}
      >
        <form id="topupForm" onSubmit={handleTopupSubmit}>
          <Label className="mt-2">
            <span>Email</span>
            <Input
              type="text"
              disabled
              value={selectedMentee?.email}
              className="mt-1"
              css=""
              valid={true}
            />
          </Label>
          <Label className="mt-2">
            <span>Name</span>
            <Input
              type="text"
              disabled
              value={selectedMentee?.name}
              className="mt-1"
              css=""
              valid={true}
            />
          </Label>
          <Label className="mt-2">
            <span>Token</span>
            <Input
              type="number"
              min={0}
              max={1000000}
              defaultValue={0}
              name="amount"
              className="mt-1"
              css=""
            />
          </Label>
        </form>
      </Modals>
    </>
  )
}

export default MenteePage
