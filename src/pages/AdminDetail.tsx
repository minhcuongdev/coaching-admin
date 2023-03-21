import React, { useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import { Input, HelperText, Label, Button } from '@windmill/react-ui'
import DefaultAvatar from '../assets/img/unnamed.png'
import { fetchAdminById } from 'features/admin/fetchAdminById'
import { selectAdmins } from 'features/admin/adminsSlice'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { Admin } from 'models'

const schema = yup
  .object({
    name: yup.string().min(2).max(50).required('Fullname is required'),
    phoneNumber: yup.string().max(24).required('Phone number is required'),
  })
  .required()

function AdminDetail(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  let { id } = useParams()

  const dispatch = useAppDispatch()
  const { admins } = useAppSelector(selectAdmins)

  let matchedAdmin = admins.find((admin: Admin) => {
    return admin.id.toString() === id?.toString()
  })

  useEffect(() => {
    dispatch(fetchAdminById(Number(id)))

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
        <PageTitle>{'Thông tin quản trị viên'}</PageTitle>
        <div>
          <Link to="/admins">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex mb-6">
          <div className="flex-shrink-0 flex justify-center w-64">
            <img
              className="mt-8 w-28 h-28 rounded-full"
              src={DefaultAvatar}
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
                  defaultValue={matchedAdmin?.name}
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
                  defaultValue={matchedAdmin?.email}
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
                  defaultValue={matchedAdmin?.phone}
                  valid={errors.phoneNumber === undefined}
                />
                <HelperText valid={false}>
                  {errors.phoneNumber?.message}
                </HelperText>
              </Label>

              <Label className="mt-4">
                <span>
                  Ngày tạo:{' '}
                  {new Date(
                    matchedAdmin?.createAt as Date
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

export default AdminDetail
