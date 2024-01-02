import axios from 'axios'
import { type ILoginResponse, type IUserResponse, type ILoginInput } from './types'
import { API_URL } from '@/utils/constant'
import { getCookiesAccessToken } from '@/utils/auth'

const service = axios.create({
  baseURL: API_URL,
  withCredentials: false // send cookies when cross-domain requests
  // timeout: 5000 // request timeout 2mn
})
service.defaults.headers.common['Content-Type'] = 'application/json'

// request interceptor
// service.interceptors.request.use(
//   (config) => {
//     if (getCookiesAccessToken()) {
//       // let each request carry token
//       config.headers['Authorization'] = 'Bearer ' + getCookiesAccessToken()
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// Axios instance and default configuration
export const refreshAccessTokenFn = async (accessToken: string) => {
  const response = await service.post<ILoginResponse>(`/v1/auth/refresh/${accessToken}`)
  //!TODO check if refresh token expire
  return response.data
}

service.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessTokenFn(getCookiesAccessToken())
      return service(originalRequest)
    }
    return Promise.reject(error)
  }
)

export const loginUserFn = async (user: ILoginInput) => {
  const response = await service.post<ILoginResponse>('/v1/auth/login', user)
  return response.data
}

export const logoutUserFn = async (refreshAccessToken: string) => {
  const response = await service.post<any>(`/v1/auth/logout/${refreshAccessToken}`, {})

  return response.data
}

export const getMeFn = async () => {
  const response = await service.get<IUserResponse>('/v1/users/profile')

  console.log(response)

  return response
}
