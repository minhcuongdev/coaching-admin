import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'config/mainConfig'

type AuthResponse = {
  accessToken: string
}

type SignInPayload = {
  email: string
  password: string
}

type PostSignInError = {
  message: string
}

export const postSignIn = createAsyncThunk<
  AuthResponse,
  SignInPayload,
  {
    rejectValue: PostSignInError
  }
>('auth/signIn', async (formData: SignInPayload, thunkApi) => {
  try {
    const res = await axios.post(
      `${config.BACKEND_URL}/v1/auth/signIn/admin`,
      formData
    )
    const { data } = res
    return data as AuthResponse
  } catch (err: any) {
    return thunkApi.rejectWithValue({
      message: 'Tài khoản hoặc mật khẩu không chính xác!',
    })
  }
})
