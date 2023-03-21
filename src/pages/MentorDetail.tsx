import { Badge, Button, Input, Label, Textarea } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import ThemedSuspense from 'components/ThemedSuspense'
import { fetchMentorById } from 'features/mentor/fetchMentorById'
import { selectMentors } from 'features/mentor/mentorSlice'
import { Mentor, Skill } from 'models'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import DefaultAvatar from '../assets/img/unnamed.png'
import PageTitle from '../components/Typography/PageTitle'
import Modals from 'components/Modals/Modals'
import { acceptCandidate } from 'features/candidate/acceptCandidate'
import { toast } from 'react-toastify'

function MentorDetail(props: any) {
  const [showAcceptMentorModal, setShowAcceptMentorModal] = useState(false)
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  let { id } = useParams()

  const dispatch = useAppDispatch()
  const { mentors } = useAppSelector(selectMentors)

  let matchedMentor = mentors.find((mentor: Mentor) => {
    return mentor.id.toString() === id?.toString()
  })

  useEffect(() => {
    dispatch(fetchMentorById(id as string))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(data: any) {
    props.editAdmin(props.auth.user._id, data)
  }

  if (matchedMentor === undefined) {
    return <ThemedSuspense />
  }

  async function handleAcceptCandidate() {
    setShowAcceptMentorModal(false)
    const actionResult = await dispatch(
      acceptCandidate(matchedMentor?.id as string)
    )
    if (acceptCandidate.fulfilled.match(actionResult)) {
      toast.success('Duyệt thành công')
      dispatch(fetchMentorById(id as string))
    } else {
      toast.error('Duyệt thất bại')
    }
  }

  function handleOpenAcceptMentorModal() {
    setShowAcceptMentorModal(true)
  }

  function handleCloseAcceptMentorModal() {
    setShowAcceptMentorModal(false)
  }

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

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Thông tin mentor</PageTitle>
        <div>
          <Link to="/mentors">
            <Button>Quay lại</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex mb-6">
          <div className="flex-shrink-0 flex justify-center w-64">
            <div className="flex flex-col gap-2 items-center">
              <img
                className="mt-8 w-28 h-28 rounded-full object-cover"
                src={matchedMentor.avatar || DefaultAvatar}
                alt="avatar"
              />
              <Badge
                type={
                  matchedMentor.User_mentor?.isVerified ? 'success' : 'danger'
                }
              >
                {matchedMentor.User_mentor?.isVerified
                  ? 'Đã xác minh'
                  : 'Chưa xác minh'}
              </Badge>
            </div>
          </div>
          <div className="mt-8 mr-4 flex-1 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>
                <span className="font-bold text-lg">Họ và tên</span>
                <Input
                  className="mt-1"
                  placeholder="Fullname"
                  defaultValue={matchedMentor?.name}
                  disabled
                  css=""
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Email</span>
                <Input
                  disabled
                  value={matchedMentor?.email}
                  className="mt-1"
                  placeholder="Email"
                  type="email"
                  css=""
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Ngày sinh</span>
                <Input
                  disabled
                  className="mt-1"
                  valid
                  css=""
                  value={new Date(
                    matchedMentor?.birthday as Date
                  ).toLocaleDateString()}
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Số điện thoại</span>
                <Input
                  disabled
                  className="mt-1"
                  css=""
                  placeholder="Phone Number"
                  type="number"
                  value={matchedMentor?.phone}
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Giới thiệu</span>
                <Textarea
                  disabled
                  className="mt-1 h-28"
                  css=""
                  placeholder="Giới thiệu"
                  value={matchedMentor?.User_mentor.introduction}
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Lĩnh vực</span>
                <Input
                  disabled
                  className="mt-1"
                  css=""
                  placeholder="Lĩnh vực"
                  type="text"
                  value={matchedMentor?.User_mentor.category.name}
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Kỹ năng</span>
                <Input
                  disabled
                  className="mt-1"
                  css=""
                  placeholder="Kỹ năng"
                  type="text"
                  value={matchedMentor?.User_mentor.skills
                    ?.map((item: Skill) => item.description)
                    .join(', ')}
                  valid
                />
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">Kinh nghiệm</span>
                <ul className="ml-6">
                  {matchedMentor?.User_mentor.experiences?.map(
                    (item: any, index: number) => (
                      <li className="mt-6">
                        <div className="flex w-full gap-4">
                          <h4 className="font-bold">{index + 1}. </h4>
                          <div className="w-full">
                            <span className="font-bold">Chức danh</span>
                            <Input
                              disabled
                              className="mt-1"
                              css=""
                              placeholder="Chức danh"
                              type="text"
                              value={item.title}
                              valid
                            />
                            <span className="font-bold">Công ty</span>
                            <Input
                              disabled
                              className="mt-1"
                              css=""
                              placeholder="Công ty"
                              type="text"
                              value={item.company}
                              valid
                            />
                            <div className="font-bold">Chi tiết</div>
                            <Textarea
                              disabled
                              className="mt-1 h-28"
                              css=""
                              placeholder=""
                              value={item.description}
                              valid
                            />
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">
                  Thành tích và chứng chỉ
                </span>
                <ul className="ml-6">
                  {matchedMentor?.User_mentor.achievements?.map(
                    (item: any, index: number) => (
                      <li className="mt-6">
                        <div className="flex w-full gap-4">
                          <h4 className="font-bold">{index + 1}. </h4>
                          <div className="w-full">
                            <div>Thành tích</div>
                            <Input
                              disabled
                              className="mt-1"
                              css=""
                              placeholder="Kỹ năng"
                              type="text"
                              value={item.title}
                              valid
                            />
                            <div>Chi tiết</div>
                            <Input
                              disabled
                              className="mt-1"
                              css=""
                              placeholder="Kỹ năng"
                              type="text"
                              value={item.description}
                              valid
                            />
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">LinkedIn</span>
                <div>
                  <a
                    href={
                      matchedMentor?.User_mentor?.linkedin
                        ? matchedMentor?.User_mentor?.linkedin
                        : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {matchedMentor?.User_mentor?.linkedin}
                  </a>
                </div>
              </Label>

              <Label className="mt-4">
                <span className="font-bold text-lg">CV</span>
                <div>
                  <a
                    href={
                      matchedMentor?.User_mentor?.cv
                        ? matchedMentor?.User_mentor?.cv
                        : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {matchedMentor?.User_mentor?.cv}
                  </a>
                </div>
              </Label>

              <Label className="mt-4">
                <span>
                  Ngày tạo:{' '}
                  {new Date(
                    matchedMentor?.createAt as Date
                  ).toLocaleDateString()}
                </span>
              </Label>

              {matchedMentor?.User_mentor.isAccepted === false && (
                <div className="mt-4">
                  <Button onClick={handleOpenAcceptMentorModal}>Duyệt</Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Modals
        isOpenModal={showAcceptMentorModal}
        actions={acceptMentorActions}
        header="Duyệt mentor"
        setClose={() => setShowAcceptMentorModal(false)}
      >
        <div>
          <p>{`Bạn chắc chắn muốn duyệt ứng viên ${matchedMentor?.name} thành mentor?`}</p>
        </div>
      </Modals>
    </>
  )
}

export default MentorDetail
