import { yupResolver } from '@hookform/resolvers/yup'
import { Button, HelperText, Input, Label } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchMenteeById } from 'features/mentee/fetchMenteeById'
import { selecteMentees } from 'features/mentee/menteeSlice'
import { Mentee } from 'models'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import * as yup from 'yup'
import DefaultAvatar from '../assets/img/unnamed.png'
import PageTitle from '../components/Typography/PageTitle'

const schema = yup
  .object({
    name: yup.string().min(2).max(50).required('Fullname is required'),
    phoneNumber: yup.string().max(24).required('Phone number is required'),
  })
  .required()

function MenteeDetail(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  let { id } = useParams()

  const dispatch = useAppDispatch()
  const { mentees } = useAppSelector(selecteMentees)

  let matchedMentee = mentees.find((mentee: Mentee) => {
    return mentee.id.toString() === id?.toString()
  })

  useEffect(() => {
    dispatch(fetchMenteeById(id as string))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit(data: any) {
    props.editAdmin(props.auth.user._id, data)
  }
  // const isMyProfile =
  //   id.toString() === props.auth.user._id.toString()
  // const { admin } = props

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>{'Thông tin mentee'}</PageTitle>
        <div>
          <Link to="/mentees">
            <Button>Quay lại</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex mb-6">
          <div className="flex-shrink-0 flex justify-center w-64">
            <img
              className="mt-8 w-28 h-28 rounded-full"
              src={matchedMentee?.avatar || DefaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="mt-8 mr-4 flex-1 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>
                <span>Họ và tên</span>
                <Input
                  {...register('name')}
                  className="mt-1"
                  placeholder="Fullname"
                  defaultValue={matchedMentee?.name}
                  disabled
                  valid={errors.name === undefined}
                  css=""
                />
                <HelperText valid={false}>{errors.name?.message}</HelperText>
              </Label>

              <Label className="mt-4">
                <span>Email</span>
                <Input
                  {...register('email')}
                  disabled
                  defaultValue={matchedMentee?.email}
                  className="mt-1"
                  placeholder="Email"
                  type="email"
                  css=""
                />
                <HelperText valid={false}>{errors.email?.message}</HelperText>
              </Label>

              <Label className="mt-4">
                <span>Số điện thoại</span>
                <Input
                  {...register('phoneNumber')}
                  disabled
                  className="mt-1"
                  css=""
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={matchedMentee?.phone}
                  valid={errors.phoneNumber === undefined}
                />
                <HelperText valid={false}>
                  {errors.phoneNumber?.message}
                </HelperText>
              </Label>

              <Label className="mt-4">
                <span>Số dư token</span>
                <Input
                  {...register('phoneNumber')}
                  disabled
                  className="mt-1"
                  css=""
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={matchedMentee?.coin}
                  valid={errors.coin === undefined}
                />
                <HelperText valid={false}>{errors.coin?.message}</HelperText>
              </Label>

              <Label className="mt-4">
                <span>
                  Ngày tạo:{' '}
                  {new Date(
                    matchedMentee?.createAt as Date
                  ).toLocaleDateString()}
                </span>

                <HelperText valid={false}>
                  {errors.phoneNumber?.message}
                </HelperText>
              </Label>

              {/* {isMyProfile && (
                <div className="flex justify-center">
                  <Button className="my-6" type="submit">
                    Update
                  </Button>
                </div>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenteeDetail
