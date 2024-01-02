import Cookies from 'js-cookie'
import { LOGIN_ACCESS_TOKEN, LOGIN_REFRESH_TOKEN } from './constant'

export const getCookiesAccessToken = () => Cookies.get(LOGIN_ACCESS_TOKEN) || ''
export const setCookiesAccessToken = (token: string) => Cookies.set(LOGIN_ACCESS_TOKEN, token)
export const removeCookiesAccessToken = () => Cookies.remove(LOGIN_ACCESS_TOKEN)

export const getCookiesRefreshToken = () => Cookies.get(LOGIN_REFRESH_TOKEN) || ''
export const setCookiesRefreshToken = (token: string) => Cookies.set(LOGIN_REFRESH_TOKEN, token)
export const removeCookiesRefreshToken = () => Cookies.remove(LOGIN_REFRESH_TOKEN)
