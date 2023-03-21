import axios, { AxiosRequestConfig } from 'axios'
import config from 'config/mainConfig'
import { store } from 'app/store'
import { signOut } from 'features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const axiosClient = axios.create({
  baseURL: `${config.BACKEND_URL}/v1`,
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const token = store.getState().auth.accessToken
    if (config.headers !== undefined) {
      config.headers.Authorization = `Bearer ${token}`
    }
    let currentDate = new Date()
    const decodedToken = jwtDecode<any>(token)
    if (decodedToken.exp < currentDate.getTime() / 1000) {
      store.dispatch(signOut())
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosClient
