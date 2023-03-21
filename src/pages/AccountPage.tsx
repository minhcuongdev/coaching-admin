import { yupResolver } from '@hookform/resolvers/yup'
import { HelperText, Input, Label, Button } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { selectAuth } from 'features/auth/authSlice'
import { fetchAccountInfo } from 'features/auth/fetchAccountInfo'
import { updateProfile } from 'features/auth/updateProfile'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import DefaultAvatar from '../assets/img/unnamed.png'
import PageTitle from '../components/Typography/PageTitle'
import { toast } from 'react-toastify'
import axiosClient from 'api/axiosClient'

const schema = yup
  .object({
    name: yup
      .string()
      .min(2)
      .max(50)
      .required('Họ và tên không được bỏ trống.'),
    phone: yup.string().max(24).required('Số điện thoại không được bỏ trống.'),
  })
  .required()

const passwordSchema = yup.object({
  oldPassword: yup
    .string()
    .min(6)
    .max(50)
    .required('Mật khẩu hiển tại không được để trống'),
  newPassword: yup
    .string()
    .min(6)
    .max(50)
    .required('Mật khẩu mới không được để trống'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
    .required('Vui lòng nhập lại mật khẩu'),
})

function AccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  })

  const dispatch = useAppDispatch()
  const { admin } = useAppSelector(selectAuth)

  useEffect(() => {
    dispatch(fetchAccountInfo())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(data: any) {
    const actionResult = await dispatch(updateProfile(data))
    if (updateProfile.fulfilled.match(actionResult)) {
      toast.success('Cập nhật thành công!')
    }
  }

  async function onChangePassword(data: any) {
    try {
      await axiosClient.post('/auth/changepassword', data)
      toast.success('Đổi mật khẩu thành công!')
      reset()
    } catch (err) {
      toast.error('Cập nhật thất bại!')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Thông tin tài khoản</PageTitle>
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
                  defaultValue={admin?.name}
                  valid={errors.name === undefined}
                  css=""
                />
                <HelperText valid={false}>{errors.name?.message}</HelperText>
              </Label>

              <Label className="mt-4">
                <span>Email</span>
                <Input
                  disabled
                  defaultValue={admin?.email}
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
                  {...register('phone')}
                  className="mt-1"
                  css=""
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={admin?.phone}
                  valid={errors.phone === undefined}
                />
                <HelperText valid={false}>{errors.phone?.message}</HelperText>
              </Label>
              <Label className="mt-4">
                <span>
                  Ngày tạo:{' '}
                  {new Date(admin?.createAt as Date).toLocaleDateString()}
                </span>

                <HelperText valid={false}>{errors.phone?.message}</HelperText>
              </Label>

              <Button className="mt-4" type="submit">
                Cập nhật
              </Button>
            </form>
          </div>
        </div>
      </div>
      <PageTitle>Đổi mật khẩu</PageTitle>

      <div className="px-8 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmitPassword(onChangePassword)}>
          <Label>
            <span>Mật khẩu hiện tại</span>
            <Input
              {...registerPassword('oldPassword')}
              type="password"
              className="mt-1"
              placeholder="Mật khẩu hiện tại"
              valid={errorsPassword.oldPassword === undefined}
              css=""
            />
            <HelperText valid={false}>
              {errorsPassword.oldPassword?.message}
            </HelperText>
          </Label>

          <Label className="mt-4">
            <span>Mật khẩu mới</span>
            <Input
              {...registerPassword('newPassword')}
              type="password"
              className="mt-1"
              placeholder="Mật khẩu mới"
              css=""
              valid={errorsPassword.newPassword === undefined}
            />
            <HelperText valid={false}>
              {errorsPassword.newPassword?.message}
            </HelperText>
          </Label>
          <Label className="mt-4">
            <span>Xác nhận mật khẩu</span>
            <Input
              {...registerPassword('confirmPassword')}
              type="password"
              className="mt-1"
              placeholder="Xác nhận mật khẩu"
              css=""
              valid={errorsPassword.confirmPassword === undefined}
            />
            <HelperText valid={false}>
              {errorsPassword.confirmPassword?.message}
            </HelperText>
          </Label>
          <Button className="mt-4" type="submit">
            Cập nhật
          </Button>
        </form>
      </div>
    </>
  )
}

export default AccountPage
