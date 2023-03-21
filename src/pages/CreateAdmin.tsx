import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Button } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch } from 'app/hook'
import { createAdmin } from 'features/admin/createAdmins'

const schema = yup
  .object({
    email: yup.string().email().required('Email không được bỏ trống'),
    name: yup.string().min(2).max(50).required('Tên không được bỏ trống'),
    phone: yup.string().max(24).required('Số điện thoại không được bỏ trống'),
    password: yup
      .string()
      .min(8)
      .max(16)
      .required('Mật khẩu không được bỏ trống'),
    confirmPassword: yup
      .string()
      .min(8)
      .max(16)
      .required('Xác nhận mật khẩu không được bỏ trống')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  })
  .required()

function CreateAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useAppDispatch()

  function onSubmit(data: any) {
    dispatch(createAdmin({ ...data, confirmPassword: undefined }))
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Tạo quản trị viên</PageTitle>
        <div>
          <Link to="/admins">
            <Button>Quay lại</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Email</span>
            <Input
              {...register('email')}
              css=""
              className="mt-1"
              placeholder="Email"
              type="email"
              valid={errors.email === undefined}
            />
            <HelperText valid={false}>{errors.email?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Họ và tên</span>
            <Input
              {...register('name')}
              className="mt-1"
              placeholder="Họ và tên"
              css=""
              valid={errors.name === undefined}
            />
            <HelperText valid={false}>{errors.name?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Số điện thoại</span>
            <Input
              {...register('phone')}
              className="mt-1"
              css=""
              placeholder="Số điện thoại"
              type="number"
              valid={errors.phone === undefined}
            />
            <HelperText valid={false}>{errors.phone?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Mật khẩu</span>
            <Input
              {...register('password')}
              css=""
              className="mt-1"
              placeholder="Mật khẩu"
              type="password"
              valid={errors.password === undefined}
            />
            <HelperText valid={false}>{errors.password?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Xác nhận mật khẩu</span>
            <Input
              {...register('confirmPassword')}
              css=""
              className="mt-1"
              placeholder="Xác nhận mật khẩu"
              type="password"
              valid={errors.password2 === undefined}
            />
            <HelperText valid={false}>
              {errors.confirmPassword?.message}
            </HelperText>
          </Label>

          <div className="flex justify-center">
            <Button className="mt-6" type="submit">
              Tạo quản trị viên
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateAdmin
