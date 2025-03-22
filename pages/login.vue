<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold mb-8">Login</h1>
    <form @submit.prevent="handleLogin" class="w-full max-w-md space-y-4">
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="text-sm font-medium">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <button 
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Login
      </button>
    </form>
    <NuxtLink 
      to="/" 
      class="mt-4 text-blue-600 hover:underline"
    >
      Back to Landing
    </NuxtLink>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Add your login logic here
  console.log('Login attempt:', { email: email.value, password: password.value })
}
</script> 