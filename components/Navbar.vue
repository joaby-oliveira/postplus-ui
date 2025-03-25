<template>
  <nav class="bg-gradient-to-r from-[#013DB2] to-[#0156FC] px-8 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/images/logo.svg" alt="Logo" class="h-8"/>
      </NuxtLink>
      
      <!-- Navigation Links -->
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <NuxtLink 
            to="/home" 
            class="text-white hover:text-opacity-80 font-inter"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/settings" 
            class="text-white hover:text-opacity-80 font-inter"
          >
            Configurações
          </NuxtLink>
          <button 
            @click="handleLogout"
            class="px-6 py-2 bg-white text-[#013DB2] rounded-lg font-medium hover:bg-opacity-90 font-inter"
          >
            Sair
          </button>
        </template>
        <template v-else>
          <NuxtLink 
            to="/signup" 
            class="px-6 py-2 bg-white text-[#013DB2] rounded-lg font-medium hover:bg-opacity-90 font-inter"
          >
            Acessar
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  if (process.client) {
    isAuthenticated.value = !!localStorage.getItem('token')
  }
})

const handleLogout = () => {
  if (process.client) {
    localStorage.removeItem('token')
    isAuthenticated.value = false
    router.push('/login')
  }
}
</script> 