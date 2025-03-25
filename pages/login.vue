<template>
  <div class="min-h-screen bg-gradient-to-br from-[#00030A] to-[#242E42]">
    <Navbar />
    
    <div class="container mx-auto px-8 py-16">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <img src="/images/logo.svg" alt="Logo" class="h-12 mx-auto mb-6"/>
          <h1 class="text-[#F5F7FA] text-4xl font-bold font-geologica">
            Bem-vindo de volta
          </h1>
          <p class="text-[#ACB9D2] mt-2 font-inter">
            Entre com suas credenciais para acessar
          </p>
        </div>

        <div class="bg-white rounded-[2rem] p-[2rem] shadow-lg">
          <form @submit.prevent="handleLogin" class="space-y-8">
            <div class="space-y-2">
              <label class="block text-[#242E42] font-medium font-inter">E-mail</label>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="empresa@exemplo.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD] font-inter"
                :class="{'border-red-500': shouldShowError('email') && formErrors.email}"
                required
                @blur="markAsTouched('email')"
                @input="markAsDirty('email')"
              >
              <p v-if="shouldShowError('email') && formErrors.email" class="text-red-500 text-sm mt-1 font-inter">
                {{ formErrors.email }}
              </p>
            </div>

            <div class="space-y-2">
              <label class="block text-[#242E42] font-medium font-inter">Senha</label>
              <input 
                v-model="form.password"
                type="password" 
                placeholder="Digite sua senha"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD] font-inter"
                :class="{'border-red-500': shouldShowError('password') && formErrors.password}"
                required
                @blur="markAsTouched('password')"
                @input="markAsDirty('password')"
              >
              <p v-if="shouldShowError('password') && formErrors.password" class="text-red-500 text-sm mt-1 font-inter">
                {{ formErrors.password }}
              </p>
            </div>

            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 bg-[#0258FD] text-white rounded-lg font-medium hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed font-inter"
            >
              {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-[#242E42] font-inter">
              Ainda não tem uma conta? 
              <NuxtLink 
                to="/signup" 
                class="text-[#0258FD] hover:underline font-medium"
              >
                Cadastre-se
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isSubmitting = ref(false)
const touchedFields = ref(new Set())
const dirtyFields = ref(new Set())
const formErrors = ref({})

const form = ref({
  email: '',
  password: ''
})

const markAsTouched = (field) => {
  touchedFields.value.add(field)
}

const markAsDirty = (field) => {
  dirtyFields.value.add(field)
}

const shouldShowError = (field) => {
  return (touchedFields.value.has(field) && dirtyFields.value.has(field)) || 
         formErrors.value[field]
}

const validateForm = () => {
  formErrors.value = {}
  let isValid = true

  if (!form.value.email) {
    formErrors.value.email = 'E-mail é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    formErrors.value.email = 'E-mail inválido'
    isValid = false
  }

  if (!form.value.password) {
    formErrors.value.password = 'Senha é obrigatória'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (validateForm()) {
    try {
      isSubmitting.value = true

      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: form.value.email,
          password: form.value.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas')
      }

      // Only access localStorage on client side
      if (process.client) {
        localStorage.setItem('token', data.access_token)
      }

      toast.success('Login realizado com sucesso!')
      
      setTimeout(() => {
        navigateTo('/home')
      }, 2000)

    } catch (error) {
      toast.error(error.message || 'Erro ao fazer login')
    } finally {
      isSubmitting.value = false
    }
  }
}

// Pre-fill for testing (remove in production)
form.value = {
  email: 'empresa@exemplo.com',
  password: 'senha123'
}
</script> 