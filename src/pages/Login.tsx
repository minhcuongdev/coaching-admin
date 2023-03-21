import ImageDark from '../assets/img/login-office-dark.jpeg'
import ImageLight from '../assets/img/login-office.jpeg'
// import { GithubIcon, TwitterIcon } from '../icons';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, HelperText, Input, Label } from '@windmill/react-ui'
import { Controller, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import { postSignIn } from 'features/auth/postSignIn'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { toast } from 'react-toastify'
import { selectAuth } from 'features/auth/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(16).required(),
  })
  .required()

export interface LoginPageProps {}

function Login(props: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isSignedIn } = useAppSelector(selectAuth)

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />
  }

  async function onSubmit(data: any) {
    const resultAction = await dispatch(postSignIn(data))
    if (postSignIn.fulfilled.match(resultAction)) {
      toast.success('Đăng nhập thành công')
      navigate('/dashboard')
    } else {
      if (resultAction.payload) {
        toast.error(resultAction.payload.message)
      }
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Đăng nhập
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                  <span>Email</span>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email"
                        className="mt-1"
                        placeholder="Email"
                        css=""
                      />
                    )}
                  />
                </Label>
                <HelperText valid={false}>{errors.email?.message}</HelperText>

                <Label className="mt-4">
                  <span>Mật khẩu</span>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        className="mt-1"
                        placeholder="Password"
                        css=""
                      />
                    )}
                  />
                </Label>
                <HelperText valid={false}>
                  {errors.password?.message}
                </HelperText>
                <Button type="submit" className="mt-4" block>
                  Đăng nhập
                </Button>
              </form>

              <hr className="my-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
