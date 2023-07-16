import { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import { Input } from '@windmill/react-ui'
import Spinner from 'components/Spinner/Spinner'
import { fetchCandidates } from 'features/candidate/fetchCandidates'
import { selectCandidates } from 'features/candidate/candidateSlice'
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
  Label,
} from '@windmill/react-ui'
import DefaultAvatar from 'assets/img/unnamed.png'
import { Icons } from 'icons'
import { Mentor } from 'models'
import Modals from 'components/Modals/Modals'
import { acceptCandidate } from 'features/candidate/acceptCandidate'
import { toast } from 'react-toastify'
import { rejectCandidate } from 'features/candidate/rejectCandidate'

const { ViewIcon } = Icons
function MentorCandidates() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [rejectReasons, setRejectReasons] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
  ])
  const [openDifferentReason, setOpenDifferentReason] = useState(false)
  const [differentReasonValue, setDifferentReasonValue] = useState('')
  // const [isAsc, setIsAsc] = useState(true)
  const [showAcceptMentorModal, setShowAcceptMentorModal] = useState(false)
  const [showRejectMentorModal, setShowRejectMentorModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Mentor | null>(
    null
  )
  const dispatch = useAppDispatch()
  const { candidates, status } = useAppSelector(selectCandidates)

  useEffect(() => {
    dispatch(fetchCandidates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = candidates
  dataTable = dataTable.filter((mentor: any) => {
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
  const totalResults = candidates.length

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

  const acceptMentorActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={handleCloseAcceptMentorModal}>
          Hủy
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button onClick={handleAcceptCandidate}>Đồng ý</Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          block
          size="large"
          layout="outline"
          onClick={handleCloseAcceptMentorModal}
        >
          Hủy
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button block size="large" onClick={handleAcceptCandidate}>
          Đồng ý
        </Button>
      </div>
    </>
  )

  const rejectMentorActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={handleCloseRejectMentorModal}>
          Hủy
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button
          disabled={rejectReasons.every((reason) => reason === '')}
          onClick={handleRejectCandidate}
        >
          Đồng ý
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          block
          size="large"
          layout="outline"
          onClick={handleCloseRejectMentorModal}
        >
          Hủy
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          disabled={rejectReasons.every((reason) => reason === '')}
          block
          size="large"
          onClick={handleRejectCandidate}
        >
          Đồng ý
        </Button>
      </div>
    </>
  )

  function handleOpenAcceptMentorModal(candidate: Mentor) {
    setSelectedCandidate(candidate)
    setShowAcceptMentorModal(true)
  }

  function handleOpenRejectMentorModal(candidate: Mentor) {
    setSelectedCandidate(candidate)
    setShowRejectMentorModal(true)
  }

  function handleCloseAcceptMentorModal() {
    setShowAcceptMentorModal(false)
  }

  function handleCloseRejectMentorModal() {
    setShowRejectMentorModal(false)
    resetReasons()
  }

  async function handleAcceptCandidate() {
    setShowAcceptMentorModal(false)
    const actionResult = await dispatch(
      acceptCandidate(selectedCandidate?.id as string)
    )
    if (acceptCandidate.fulfilled.match(actionResult)) {
      toast.success('Duyệt thành công')
    } else {
      toast.error('Duyệt thất bại')
    }
  }

  async function handleRejectCandidate() {
    if (differentReasonValue) {
      rejectReasons.push(differentReasonValue)
      setRejectReasons(rejectReasons)
    }
    const actionResult = await dispatch(
      rejectCandidate({
        id: selectedCandidate?.id ?? '',
        reasons: rejectReasons,
      })
    )
    if (rejectCandidate.fulfilled.match(actionResult)) {
      setShowRejectMentorModal(false)
      resetReasons()
      toast.success('Từ chối thành công')
    } else {
      toast.error('Từ chối thất bại')
    }
  }

  function handleReasons(index: number, reason: string) {
    rejectReasons[index] = reason
    setRejectReasons([...rejectReasons])
  }

  function resetReasons() {
    setRejectReasons(['', '', '', '', ''])
    setOpenDifferentReason(false)
    setDifferentReasonValue('')
  }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Duyệt ứng viên</PageTitle>
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
      {status === 'pending' ? (
        <Spinner />
      ) : candidates.length === 0 ? (
        'Không tìm thấy ứng viên nào.'
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Xác minh (eKYC)</TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((user: Mentor, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-3 md:block"
                        src={user.avatar ? user.avatar : DefaultAvatar}
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
                      type={user.User_mentor.isVerified ? 'success' : 'danger'}
                    >
                      {user.User_mentor.isVerified
                        ? 'Đã xác minh'
                        : 'Chưa xác minh'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-1">
                      <Link to={`/mentors/${user.id}`}>
                        <Button layout="link" size="small" aria-label="Edit">
                          <ViewIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </Link>
                      <Button onClick={() => handleOpenAcceptMentorModal(user)}>
                        Duyệt
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600 focus:ring-red-400 active:bg-red-500"
                        onClick={() => handleOpenRejectMentorModal(user)}
                      >
                        Từ chối
                      </Button>
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
        isOpenModal={showAcceptMentorModal}
        actions={acceptMentorActions}
        header="Duyệt mentor"
        setClose={() => setShowAcceptMentorModal(false)}
      >
        <div>
          <p>{`Bạn chắc chắn muốn duyệt ứng viên ${selectedCandidate?.name} thành mentor?`}</p>
        </div>
      </Modals>
      <Modals
        isOpenModal={showRejectMentorModal}
        actions={rejectMentorActions}
        header="Từ chối mentor"
        setClose={() => setShowRejectMentorModal(false)}
      >
        <div>
          <p>{`Bạn chắc chắn muốn Từ chối ứng viên ${selectedCandidate?.name} thành mentor?`}</p>
          <div className="mt-4 flex flex-col gap-2">
            <p className="mb-2">Lý do từ chối:</p>
            <Label check>
              <Input
                css=""
                type="checkbox"
                value={'Chưa thực hiện xác minh danh tính'}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleReasons(0, e.target.value)
                  } else {
                    handleReasons(0, '')
                  }
                }}
              />
              <span className="ml-2">Chưa thực hiện xác minh danh tính</span>
            </Label>
            <Label check>
              <Input
                css=""
                value={
                  'Thông tin xác thực không trùng khớp với thông tin đăng ký'
                }
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    handleReasons(1, e.target.value)
                  } else {
                    handleReasons(1, '')
                  }
                }}
              />
              <span className="ml-2">
                Thông tin xác thực không trùng khớp với thông tin đăng ký
              </span>
            </Label>
            <Label check>
              <Input
                css=""
                type="checkbox"
                value={'Lĩnh vực và chuyên mục đăng ký không phù hợp'}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleReasons(2, e.target.value)
                  } else {
                    handleReasons(2, '')
                  }
                }}
              />
              <span className="ml-2">
                Lĩnh vực và chuyên mục đăng ký không phù hợp
              </span>
            </Label>
            <Label check>
              <Input
                css=""
                type="checkbox"
                value={'Chưa đủ số năm kinh nghiệm'}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleReasons(3, e.target.value)
                  } else {
                    handleReasons(3, '')
                  }
                }}
              />
              <span className="ml-2">Chưa đủ số năm kinh nghiệm</span>
            </Label>
            <Label check>
              <Input
                css=""
                type="checkbox"
                value={'Chưa đạt yêu cầu khi kiểm duyệt chất lượng'}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleReasons(4, e.target.value)
                  } else {
                    handleReasons(4, '')
                  }
                }}
              />
              <span className="ml-2">
                Chưa đạt yêu cầu khi kiểm duyệt chất lượng
              </span>
            </Label>
            <Label check>
              <Input
                css=""
                type="checkbox"
                checked={openDifferentReason}
                onChange={() => {
                  setOpenDifferentReason(!openDifferentReason)
                }}
              />
              <span className="ml-2">Khác:</span>
            </Label>
            {openDifferentReason ? (
              <Input
                css=""
                aria-label="Bad"
                placeholder="Nhập lý do khác..."
                value={differentReasonValue}
                onChange={(e) => setDifferentReasonValue(e.currentTarget.value)}
              />
            ) : null}
          </div>
        </div>
      </Modals>
    </>
  )
}

export default MentorCandidates
