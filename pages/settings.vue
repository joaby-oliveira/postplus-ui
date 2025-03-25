<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gradient-to-br from-[#00030A] to-[#242E42]">
    <Navbar />
    
    <div class="container mx-auto px-8 py-16">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-[#F5F7FA] text-4xl font-bold font-geologica mb-4">
            Configurações da Empresa
          </h1>
          <p class="text-[#ACB9D2] text-xl font-inter">
            Personalize sua empresa
          </p>
        </div>

        <div class="bg-white rounded-[2rem] p-[2rem] shadow-lg">
          <!-- Logo Upload Section -->
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-[#242E42] font-geologica">
              Logo da Empresa
            </h2>
            
            <div class="flex items-center space-x-8">
              <!-- Logo Preview -->
              <div class="relative">
                <div class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="logoPreview" 
                    :src="logoPreview" 
                    alt="Logo Preview" 
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-4xl font-bold text-gray-300">
                    {{ companyInitial }}
                  </span>
                </div>
              </div>

              <!-- Upload Controls -->
              <div class="flex-1 space-y-4">
                <div>
                  <label 
                    class="block text-[#242E42] font-medium mb-2 font-inter"
                  >
                    Faça upload da sua logo
                  </label>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileChange"
                  />
                  <div class="flex space-x-4">
                    <button
                      @click="triggerFileInput"
                      class="px-6 py-2 bg-[#0258FD] text-white rounded-lg font-medium hover:bg-opacity-90 font-inter"
                      :disabled="isUploading"
                    >
                      {{ isUploading ? 'Enviando...' : 'Escolher arquivo' }}
                    </button>
                    <button
                      v-if="logoPreview"
                      @click="removeLogo"
                      class="px-6 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 font-inter"
                      :disabled="isUploading"
                    >
                      Remover
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-500 font-inter">
                  Formatos aceitos: PNG, JPG ou JPEG. Tamanho máximo: 2MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

definePageMeta({
  middleware: ['auth']
})

const toast = useToast()
const isAuthenticated = ref(false)
const isUploading = ref(false)
const fileInput = ref(null)
const logoPreview = ref(null)
const companyName = ref('Empresa') // This should be fetched from your API

// Computed property for company initial
const companyInitial = computed(() => {
  return companyName.value ? companyName.value[0].toUpperCase() : 'E'
})

onMounted(async () => {
  if (process.client) {
    isAuthenticated.value = !!localStorage.getItem('token')
    // Here you should fetch company data including the logo if it exists
    await fetchCompanyData()
  }
})

const fetchCompanyData = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/companies/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      companyName.value = data.name
      if (data.logo) {
        logoPreview.value = data.logo
      }
    }
  } catch (error) {
    console.error('Error fetching company data:', error)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    toast.error('Formato de arquivo não suportado. Use PNG, JPG ou JPEG.')
    return
  }

  // Validate file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    toast.error('Arquivo muito grande. O tamanho máximo é 2MB.')
    return
  }

  try {
    isUploading.value = true

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)

    // Create FormData
    const formData = new FormData()
    formData.append('logo', file)

    // Upload to server
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/companies/logo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error('Erro ao fazer upload da logo')
    }

    toast.success('Logo atualizada com sucesso!')
  } catch (error) {
    console.error('Error uploading logo:', error)
    toast.error(error.message || 'Erro ao fazer upload da logo')
    // Reset preview on error
    logoPreview.value = null
  } finally {
    isUploading.value = false
    // Reset file input
    event.target.value = ''
  }
}

const removeLogo = async () => {
  try {
    isUploading.value = true

    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/companies/logo', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Erro ao remover a logo')
    }

    logoPreview.value = null
    toast.success('Logo removida com sucesso!')
  } catch (error) {
    console.error('Error removing logo:', error)
    toast.error(error.message || 'Erro ao remover a logo')
  } finally {
    isUploading.value = false
  }
}
</script> 