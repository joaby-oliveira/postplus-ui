<template>
  <div class="min-h-screen bg-gradient-to-br from-[#00030A] to-[#242E42]">
    <Navbar />

    <div class="container mx-auto px-8 py-16">
      <div v-if="isAuthenticated" class="max-w-3xl mx-auto">
        <h1 class="text-[#F5F7FA] text-4xl font-bold font-geologica mb-2">
          Configurações da Empresa
        </h1>
        <p class="text-gray-400 font-inter mb-8">
          Personalize sua empresa
        </p>

        <div class="bg-white rounded-[2rem] p-[2rem] shadow-lg">
          <form @submit.prevent="handleSubmit" class="space-y-6 font-inter">
            <!-- Logo Upload -->
            <div class="space-y-2">
              <label class="block text-[#242E42] font-medium">Logo da Empresa</label>
              <div class="flex items-center space-x-4">
                <!-- Logo Preview -->
                <div class="relative">
                  <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img 
                      v-if="form.logoPreview" 
                      :src="form.logoPreview" 
                      alt="Logo Preview" 
                      class="w-full h-full object-cover"
                    />
                    <span v-else class="text-2xl font-bold text-gray-300">
                      {{ form.name ? form.name[0].toUpperCase() : 'E' }}
                    </span>
                  </div>
                </div>

                <!-- Upload Controls -->
                <div class="flex-1">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleLogoChange"
                  />
                  <div class="flex space-x-4">
                    <button
                      type="button"
                      @click="triggerFileInput"
                      class="px-4 py-2 bg-[#0258FD] text-white rounded-lg font-medium hover:bg-opacity-90 text-sm"
                    >
                      Escolher arquivo
                    </button>
                    <button
                      v-if="form.logoPreview"
                      type="button"
                      @click="removeLogo"
                      class="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 text-sm"
                    >
                      Remover
                    </button>
                  </div>
                  <p class="text-sm text-gray-500 mt-2">
                    Formatos aceitos: PNG, JPG ou JPEG. Tamanho máximo: 2MB
                  </p>
                </div>
              </div>
            </div>

            <!-- Company Info -->
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">Nome da Empresa</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  placeholder="Empresa Exemplo"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('name') && formErrors.name}"
                  required
                  @blur="markAsTouched('name')"
                  @input="markAsDirty('name')"
                >
                <p v-if="shouldShowError('name') && formErrors.name" class="text-red-500 text-sm mt-1">
                  {{ formErrors.name }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">CNPJ</label>
                <input 
                  v-model="form.cnpj"
                  type="text" 
                  placeholder="XX.XXX.XXX/XXXX-XX"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('cnpj') && formErrors.cnpj}"
                  required
                  @input="handleCNPJInput"
                  @keydown="(e) => handleKeydown(e, 'cnpj')"
                  @blur="markAsTouched('cnpj')"
                >
                <p v-if="shouldShowError('cnpj') && formErrors.cnpj" class="text-red-500 text-sm mt-1">
                  {{ formErrors.cnpj }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">WhatsApp</label>
                <input 
                  v-model="form.whatsapp"
                  type="tel" 
                  placeholder="(XX) XXXXX-XXXX"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('whatsapp') && formErrors.whatsapp}"
                  required
                  @input="handleWhatsAppInput"
                  @blur="markAsTouched('whatsapp')"
                >
                <p v-if="shouldShowError('whatsapp') && formErrors.whatsapp" class="text-red-500 text-sm mt-1">
                  {{ formErrors.whatsapp }}
                </p>
              </div>
            </div>

            <!-- Address Info -->
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">CEP</label>
                <input 
                  v-model="form.zipCode"
                  type="text" 
                  placeholder="XXXXX-XXX"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('zipCode') && formErrors.zipCode}"
                  required
                  @input="handleCEPInput"
                  @blur="fetchAddress"
                >
                <p v-if="shouldShowError('zipCode') && formErrors.zipCode" class="text-red-500 text-sm mt-1">
                  {{ formErrors.zipCode }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">Endereço</label>
                <input 
                  v-model="form.street"
                  type="text" 
                  placeholder="Rua"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('street') && formErrors.street}"
                  required
                  :disabled="isLoadingAddress"
                >
                <p v-if="shouldShowError('street') && formErrors.street" class="text-red-500 text-sm mt-1">
                  {{ formErrors.street }}
                </p>
              </div>

              <div class="grid grid-cols-3 gap-8">
                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Número</label>
                  <input 
                    v-model="form.number"
                    type="text" 
                    placeholder="123"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    :class="{'border-red-500': shouldShowError('number') && formErrors.number}"
                    required
                  >
                  <p v-if="shouldShowError('number') && formErrors.number" class="text-red-500 text-sm mt-1">
                    {{ formErrors.number }}
                  </p>
                </div>

                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Cidade</label>
                  <input 
                    v-model="form.city"
                    type="text" 
                    placeholder="Cidade"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    :class="{'border-red-500': shouldShowError('city') && formErrors.city}"
                    required
                    :disabled="isLoadingAddress"
                  >
                  <p v-if="shouldShowError('city') && formErrors.city" class="text-red-500 text-sm mt-1">
                    {{ formErrors.city }}
                  </p>
                </div>

                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Estado</label>
                  <input 
                    v-model="form.state"
                    type="text" 
                    placeholder="UF"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    :class="{'border-red-500': shouldShowError('state') && formErrors.state}"
                    required
                    :disabled="isLoadingAddress"
                  >
                  <p v-if="shouldShowError('state') && formErrors.state" class="text-red-500 text-sm mt-1">
                    {{ formErrors.state }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-8">
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-2 bg-[#0258FD] text-white rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? 'Salvando...' : 'Salvar Alterações' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div v-else class="text-center">
        <h1 class="text-[#F5F7FA] text-4xl font-bold font-geologica mb-4">
          Acesso Negado
        </h1>
        <p class="text-gray-400 font-inter mb-8">
          Você precisa estar logado para acessar esta página
        </p>
        <NuxtLink 
          to="/login" 
          class="inline-block px-6 py-2 bg-[#0258FD] text-white rounded-lg hover:bg-opacity-90"
        >
          Fazer Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { ref, onMounted } from 'vue'

const toast = useToast()
const isAuthenticated = ref(false)
const isSubmitting = ref(false)
const isLoadingAddress = ref(false)
const formErrors = ref({})
const touchedFields = ref(new Set())
const dirtyFields = ref(new Set())
const fileInput = ref(null)

const form = ref({
  name: '',
  cnpj: '',
  whatsapp: '',
  logo: null,
  logoPreview: null,
  zipCode: '',
  street: '',
  number: '',
  city: '',
  state: ''
})

// Validation and form handling functions
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

  if (!form.value.name) {
    formErrors.value.name = 'Nome da empresa é obrigatório'
    isValid = false
  }
  
  if (!form.value.cnpj) {
    formErrors.value.cnpj = 'CNPJ é obrigatório'
    isValid = false
  }
  
  if (!form.value.whatsapp) {
    formErrors.value.whatsapp = 'WhatsApp é obrigatório'
    isValid = false
  }

  if (!form.value.zipCode) {
    formErrors.value.zipCode = 'CEP é obrigatório'
    isValid = false
  }
  
  if (!form.value.street) {
    formErrors.value.street = 'Endereço é obrigatório'
    isValid = false
  }
  
  if (!form.value.number) {
    formErrors.value.number = 'Número é obrigatório'
    isValid = false
  }
  
  if (!form.value.city) {
    formErrors.value.city = 'Cidade é obrigatória'
    isValid = false
  }
  
  if (!form.value.state) {
    formErrors.value.state = 'Estado é obrigatório'
    isValid = false
  }

  return isValid
}

// Logo handling functions
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleLogoChange = async (event) => {
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

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.logoPreview = e.target.result
  }
  reader.readAsDataURL(file)

  // Store file for later upload
  form.value.logo = file
}

const removeLogo = () => {
  form.value.logo = null
  form.value.logoPreview = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Address handling functions
const fetchAddress = async () => {
  const cep = form.value.zipCode.replace(/\D/g, '')
  
  if (cep.length !== 8) return
  
  try {
    isLoadingAddress.value = true
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    
    if (!data.erro) {
      form.value.street = data.logradouro
      form.value.city = data.localidade
      form.value.state = data.uf
    }
  } catch (error) {
    console.error('Error fetching address:', error)
  } finally {
    isLoadingAddress.value = false
  }
}

// Mask functions
const maskCNPJ = (value) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1.$2')
  value = value.replace(/^(\d{2}\.\d{3})(\d)/, '$1.$2')
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
  value = value.replace(/(\d{4})(\d)/, '$1-$2')
  return value
}

const maskWhatsApp = (value) => {
  value = value.replace(/\D/g, '')
  value = value.slice(0, 11)
  
  if (value.length > 0) {
    value = value.replace(/^(\d{2})(\d)/, '($1) $2')
    if (value.length > 6) {
      value = value.replace(/(\d{5})(\d{4})$/, '$1-$2')
    }
  }

  return value
}

const maskCEP = (value) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  return value
}

// Input handlers
const handleCNPJInput = (event) => {
  const input = event.target
  let value = input.value
  input.value = maskCNPJ(value)
  form.value.cnpj = input.value
  markAsDirty('cnpj')
}

const handleWhatsAppInput = (event) => {
  const input = event.target
  const cursorPosition = input.selectionStart
  const oldValue = input.value
  const newValue = maskWhatsApp(input.value)
  
  input.value = newValue
  form.value.whatsapp = newValue
  
  if (cursorPosition && oldValue.length < newValue.length) {
    input.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
  }
  
  markAsDirty('whatsapp')
}

const handleCEPInput = (event) => {
  const input = event.target
  let value = input.value
  input.value = maskCEP(value)
  form.value.zipCode = input.value
  markAsDirty('zipCode')
}

// Max length handlers
const maxLength = {
  cnpj: 18,    // XX.XXX.XXX/XXXX-XX
  whatsapp: 19, // +55 (XX) XXXXX-XXXX
  cep: 9       // XXXXX-XXX
}

const handleKeydown = (event, type) => {
  const input = event.target
  if (input.value.length >= maxLength[type] && 
      event.keyCode !== 8 && // Backspace
      event.keyCode !== 9 && // Tab
      event.keyCode !== 37 && // Left arrow
      event.keyCode !== 39) { // Right arrow
    event.preventDefault()
  }
}

// Fetch company data
const fetchCompanyData = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }

    // Decode the JWT token to get the company ID from the sub field
    const payload = JSON.parse(atob(token.split('.')[1]))
    const companyId = payload.sub

    const response = await fetch(`http://localhost:3000/companies/${companyId}`, {
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch company data')
    }

    const data = await response.json()
    
    // Update form with company data, using the full logoUrl for the preview
    console.log(data.logoUrl);
    form.value = {
      ...form.value,
      name: data.name,
      cnpj: maskCNPJ(data.cnpj),
      whatsapp: maskWhatsApp(data.whatsapp.replace('+55', '')),
      zipCode: maskCEP(data.zipCode),
      street: data.street.split(',')[0],
      number: data.street.split(',')[1]?.trim() || '',
      city: data.city,
      state: data.state,
      logoPreview: data.logoUrl ?? null
    }
  } catch (error) {
    console.error('Error fetching company data:', error)
    toast.error('Erro ao carregar dados da empresa')
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (validateForm()) {
    try {
      isSubmitting.value = true
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No token found')
      }

      // Decode the JWT token to get the company ID from the sub field
      const payload = JSON.parse(atob(token.split('.')[1]))
      const companyId = payload.sub

      const fullAddress = form.value.number 
        ? `${form.value.street}, ${form.value.number}`
        : form.value.street

      // Format WhatsApp number: remove non-digits and add +55
      const formattedWhatsApp = '+55' + form.value.whatsapp.replace(/\D/g, '')

      // Create company data object (without logo)
      const companyData = {
        name: form.value.name,
        cnpj: form.value.cnpj.replace(/\D/g, ''),
        street: fullAddress,
        city: form.value.city,
        state: form.value.state,
        zipCode: form.value.zipCode.replace(/\D/g, ''),
        whatsapp: formattedWhatsApp
      }

      // First step: Update company data
      const response = await fetch(`http://localhost:3000/companies/${companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(companyData)
      })

      if (!response.ok) {
        throw new Error('Failed to update company data')
      }

      const data = await response.json()

      // Second step: Upload logo if changed
      if (form.value.logo) {
        const logoFormData = new FormData()
        logoFormData.append('logo', form.value.logo)

        const logoResponse = await fetch(`http://localhost:3000/companies/${data.id}/logo`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: logoFormData
        })

        if (!logoResponse.ok) {
          console.warn('Logo upload failed:', await logoResponse.json())
          // Don't throw error here, as the company data was updated successfully
        }
      }

      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.error('Error updating company:', error)
      toast.error('Erro ao atualizar dados da empresa')
    } finally {
      isSubmitting.value = false
    }
  }
}

// Check authentication on mount
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    isAuthenticated.value = true
    await fetchCompanyData()
  } else {
    navigateTo('/login')
  }
})
</script> 