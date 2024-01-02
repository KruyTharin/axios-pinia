<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { logoutUserFn } from '@/api/axios'
import { useMutation } from 'vue-query'
import { useAuthStore } from '@/stores/useAuthStore'
import { createToast } from 'mosha-vue-toastify'
import { removeCookiesAccessToken, removeCookiesRefreshToken } from '@/utils/auth'

const authStore = useAuthStore()
const user = authStore.authUser
const { refresh_token } = authStore.authToken

const { mutate: logoutUser } = useMutation(() => logoutUserFn(refresh_token), {
  onSuccess: () => {
    authStore.setAuthUser(null)
    removeCookiesAccessToken(), removeCookiesRefreshToken(), (document.location.href = '/login')
  },
  onError: (error) => {
    if (Array.isArray((error as any).response.data.error)) {
      ;(error as any).response.data.error.forEach((el: any) =>
        createToast(el.message, {
          position: 'top-right',
          type: 'warning'
        })
      )
    } else {
      createToast((error as any).response.data.message, {
        position: 'top-right',
        type: 'danger'
      })
    }
  }
})

const handleLogout = () => {
  logoutUser()
}
</script>

<template>
  <header class="bg-white h-20">
    <nav class="h-full flex justify-between container items-center">
      <div>
        <router-link to="/" class="text-ct-dark-600 font-semibold">CodevoWeb</router-link>
      </div>
      <ul class="flex items-center gap-4">
        <li><router-link to="/" class="text-ct-dark-600">Home</router-link></li>
        <li v-if="!user">
          <router-link to="/register" class="text-ct-dark-600">SignUp</router-link>
        </li>
        <li v-if="!user">
          <router-link to="/login" class="text-ct-dark-600">Login</router-link>
        </li>
        <li v-if="user" class="flex space-x-2">
          <router-link to="/profile" class="text-ct-dark-600">Profile</router-link>
          <span> {{ user?.data.username }}</span>
        </li>
        <li v-if="user" class="cursor-pointer" @click="handleLogout">Logout</li>
      </ul>
    </nav>
  </header>
</template>
@/api/axios
