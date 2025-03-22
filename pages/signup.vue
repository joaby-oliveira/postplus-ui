<template>
  <div class="min-h-screen bg-gradient-to-br from-[#00030A] to-[#242E42]">
    <Navbar />

    <div class="container mx-auto px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <!-- Instagram-like Preview (Left) -->
        <div class="sticky top-8">
          <div class="bg-white rounded-2xl shadow-xl max-w-md">
            <!-- Instagram Header -->
            <div class="flex items-center p-3 border-b">
              <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <!-- Company initial or logo placeholder -->
                <span class="font-bold text-gray-500">
                  {{ form.name ? form.name[0].toUpperCase() : 'E' }}
                </span>
              </div>
              <span class="ml-3 font-semibold">{{ form.name || 'Empresa' }}</span>
              <div class="ml-auto">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </div>
            </div>

            <!-- Updated Art Preview Area -->
            <div class="aspect-square bg-gradient-to-br from-[#0258FD] to-[#013DB2] flex flex-col items-center justify-center p-8 relative overflow-hidden">
              <!-- Decorative SVG Elements -->
              <div class="absolute top-0 left-0 w-full h-full opacity-10">
                <svg viewBox="0 0 100 100" class="w-32 h-32 absolute top-4 right-4">
                  <circle cx="50" cy="50" r="40" fill="white"/>
                </svg>
                <svg viewBox="0 0 100 100" class="w-24 h-24 absolute bottom-8 left-8">
                  <rect x="20" y="20" width="60" height="60" fill="white"/>
                </svg>
                <svg viewBox="0 0 100 100" class="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <polygon points="50,10 90,90 10,90" fill="white"/>
                </svg>
              </div>

              <!-- Promotional Content -->
              <div class="text-white text-center z-10 mb-auto">
                <h3 class="font-geologica text-3xl font-bold mb-2">PROMOÇÃO</h3>
                <p class="font-inter text-xl">Aproveite as ofertas!</p>
              </div>

              <!-- Company Info at Bottom -->
              <div class="bg-white/90 backdrop-blur-sm absolute bottom-0 left-0 right-0 p-4 text-center">
                <h2 class="font-geologica text-lg font-bold text-[#242E42]">
                  {{ form.name || 'Nome da Empresa' }}
                </h2>
                <div class="font-inter text-[#242E42] text-sm mt-1">
                  <p>{{ form.street && form.number ? `${form.street}, ${form.number}` : 'Endereço da empresa' }}</p>
                  <p>{{ form.whatsapp || 'Contato: (XX) XXXXX-XXXX' }}</p>
                </div>
              </div>
            </div>

            <!-- Instagram Actions -->
            <div class="p-4 border-t">
              <div class="flex space-x-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>

              <!-- Caption -->
              <div class="mt-4 font-inter text-sm">
                <span class="font-semibold">{{ form.name || 'Empresa' }}</span>
                <span class="ml-2">
                  {{ form.street && form.number ? `${form.street}, ${form.number}` : 'Endereço da empresa' }}
                  {{ form.street ? `📍 ${form.street}` : 'Endereço da empresa' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Multi-step Form (Right) -->
        <div>
          <h1 class="text-[#F5F7FA] text-4xl font-bold font-geologica mb-8">
            Cadastro de Empresa
          </h1>

          <!-- Step Indicator -->
          <div class="flex justify-between mb-8">
            <div 
              v-for="(step, index) in steps" 
              :key="step"
              class="flex items-center"
            >
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center font-inter"
                :class="[
                  currentStep === index 
                    ? 'bg-[#0258FD] text-white' 
                    : currentStep > index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                ]"
              >
                {{ index + 1 }}
              </div>
              <span 
                class="ml-2 font-inter"
                :class="currentStep === index ? 'text-white' : 'text-gray-400'"
              >
                {{ step }}
              </span>
              <div 
                v-if="index < steps.length - 1" 
                class="mx-4 h-[2px] w-12 bg-gray-200"
                :class="currentStep > index ? 'bg-green-500' : 'bg-gray-200'"
              />
            </div>
          </div>
          
          <div class="bg-white rounded-[2rem] p-[2rem] shadow-lg">
            <!-- Step 1: Login -->
            <form v-if="currentStep === 0" @submit.prevent="nextStep" class="space-y-6 font-inter">
              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">E-mail</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="empresa@exemplo.com"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('email') && formErrors.email}"
                  required
                  @blur="markAsTouched('email')"
                  @input="markAsDirty('email')"
                >
                <p v-if="shouldShowError('email') && formErrors.email" class="text-red-500 text-sm mt-1">
                  {{ formErrors.email }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">Senha</label>
                <input 
                  v-model="form.password"
                  type="password" 
                  placeholder="Mínimo 6 caracteres"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('password') && formErrors.password}"
                  required
                  @blur="markAsTouched('password')"
                  @input="markAsDirty('password')"
                >
                <p v-if="shouldShowError('password') && formErrors.password" class="text-red-500 text-sm mt-1">
                  {{ formErrors.password }}
                </p>
              </div>

              <button type="submit" class="ml-auto px-6 py-2 bg-[#0258FD] text-white rounded-lg hover:bg-opacity-90">
                Próximo
              </button>
            </form>

            <!-- Step 2: Company Info -->
            <form v-if="currentStep === 1" @submit.prevent="nextStep" class="space-y-6 font-inter">
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
                  placeholder="Digite o CNPJ"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('cnpj') && formErrors.cnpj}"
                  required
                  @blur="markAsTouched('cnpj')"
                  @input="markAsDirty('cnpj')"
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
                  placeholder="+55 (XX) XXXXX-XXXX"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('whatsapp') && formErrors.whatsapp}"
                  required
                  @blur="markAsTouched('whatsapp')"
                >
                <p v-if="shouldShowError('whatsapp') && formErrors.whatsapp" class="text-red-500 text-sm mt-1">
                  {{ formErrors.whatsapp }}
                </p>
              </div>

              <button type="submit" class="ml-auto px-6 py-2 bg-[#0258FD] text-white rounded-lg hover:bg-opacity-90">
                Próximo
              </button>
            </form>

            <!-- Step 3: Address -->
            <form v-if="currentStep === 2" @submit.prevent="handleSubmit" class="space-y-6 font-inter">
              <div class="space-y-2">
                <label class="block text-[#242E42] font-medium">CEP</label>
                <input 
                  v-model="form.zipCode"
                  type="text" 
                  placeholder="XXXXX-XXX"
                  @input="fetchAddress; markAsTouched('zipCode')"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                  :class="{'border-red-500': shouldShowError('zipCode') && formErrors.zipCode}"
                  required
                >
                <p v-if="shouldShowError('zipCode') && formErrors.zipCode" class="text-red-500 text-sm mt-1">
                  {{ formErrors.zipCode }}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Endereço</label>
                  <input 
                    v-model="form.street"
                    type="text" 
                    placeholder="Rua Exemplo"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    required
                    :disabled="isLoadingAddress"
                    @blur="markAsTouched('street')"
                    @input="markAsDirty('street')"
                  >
                </div>
                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Número</label>
                  <input 
                    v-model="form.number"
                    type="text" 
                    placeholder="123"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    required
                    @blur="markAsTouched('number')"
                    @input="markAsDirty('number')"
                  >
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Cidade</label>
                  <input 
                    v-model="form.city"
                    type="text" 
                    placeholder="São Paulo"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    required
                    :disabled="isLoadingAddress"
                    @blur="markAsTouched('city')"
                    @input="markAsDirty('city')"
                  >
                </div>
                <div class="space-y-2">
                  <label class="block text-[#242E42] font-medium">Estado</label>
                  <input 
                    v-model="form.state"
                    type="text" 
                    placeholder="SP"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
                    required
                    :disabled="isLoadingAddress"
                    @blur="markAsTouched('state')"
                    @input="markAsDirty('state')"
                  >
                </div>
              </div>

              <button type="submit" class="ml-auto px-6 py-2 bg-[#0258FD] text-white rounded-lg hover:bg-opacity-90">
                Finalizar Cadastro
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentStep = ref(0)
const steps = ['Login', 'Empresa', 'Endereço']
const isLoadingAddress = ref(false)
const formErrors = ref({})
const touchedFields = ref(new Set())
const dirtyFields = ref(new Set())

const form = ref({
  email: '',
  password: '',
  name: '',
  cnpj: '',
  whatsapp: '',
  street: '',
  number: '',
  city: '',
  state: '',
  zipCode: ''
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

const validateStep = () => {
  formErrors.value = {}
  let isValid = true
  
  switch (currentStep.value) {
    case 0: // Login
      if (!form.value.email) {
        formErrors.value.email = 'E-mail é obrigatório'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        formErrors.value.email = 'Formato de e-mail inválido'
        isValid = false
      }
      
      if (!form.value.password) {
        formErrors.value.password = 'Senha é obrigatória'
        isValid = false
      } else if (form.value.password.length < 6) {
        formErrors.value.password = 'A senha deve ter no mínimo 6 caracteres'
        isValid = false
      }
      break

    case 1: // Company
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
      break

    case 2: // Address
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
      break
  }

  return isValid
}

const nextStep = () => {
  const currentStepFields = {
    0: ['email', 'password'],
    1: ['name', 'cnpj', 'whatsapp'],
    2: ['zipCode', 'street', 'number', 'city', 'state']
  }[currentStep.value]

  currentStepFields.forEach(field => {
    touchedFields.value.add(field)
    dirtyFields.value.add(field)
  })

  if (validateStep()) {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  }
}

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

const handleSubmit = () => {
  if (validateStep()) {
    console.log('Form submitted:', form.value)
    // Handle final submission
  }
}
</script> 