import type { IAuthToken, IUserResponse } from '@/api/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getCookiesAccessToken, getCookiesRefreshToken } from '@/utils/auth'

export type AuthStoreState = IUserResponse | null

export const useAuthStore = defineStore('authStore', () => {
  const authUser = ref<AuthStoreState>(null)
  const authToken = ref<IAuthToken>({
    access_token: getCookiesAccessToken(),
    refresh_token: getCookiesRefreshToken()
  })
  const getAccessToken = computed(() => authToken.value.access_token)
  const getRefreshToken = computed((): any => authToken.value.refresh_token)

  const setAuthUser = async (user: any) => {
    authUser.value = user
  }

  const setAccessToken = (accessToken: string) => {
    authToken.value.access_token = accessToken
  }

  const setRefreshToken = (refreshToken: string) => {
    authToken.value.refresh_token = refreshToken
  }

  return {
    authUser,
    authToken,
    getAccessToken,
    getRefreshToken,
    setAuthUser,
    setAccessToken,
    setRefreshToken
  }
})
