<template>
  <Header />
  <section class="bg-ct-blue-600 min-h-screen pt-20">
    <div
      class="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center"
    >
      <div>
        <p class="text-5xl font-semibold">Profile Page</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { useAuthStore } from '@/stores/useAuthStore'
const authStore = useAuthStore()
console.log(authStore.authUser)
</script>
