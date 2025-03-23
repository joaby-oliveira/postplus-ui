<template>
  <div v-if="isAuthenticated" class="min-h-screen bg-gradient-to-br from-[#00030A] to-[#242E42]">
    <Navbar />
    
    <div class="container mx-auto px-8 py-16">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-white text-4xl font-bold font-geologica mb-4">
          Tudo pronto!
        </h1>
        <p class="text-white text-xl font-inter">
          Clique no botão abaixo para baixar a arte.
        </p>
      </div>

      <!-- Grid of Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Repeat this card 6 times -->
        <div v-for="i in 6" :key="i" class="flex flex-col items-center">
          <!-- Art Preview -->
          <div class="bg-white rounded-lg overflow-hidden shadow-lg mb-4">
            <img 
              src="/images/mockup.png" 
              alt="Arte Pneus" 
              class="w-full h-auto"
            />
          </div>

          <!-- Download Buttons -->
          <div class="space-y-2 w-full">
            <button 
              class="w-full py-3 bg-[#0258FD] text-white rounded-lg font-medium hover:bg-opacity-90 font-inter"
            >
              Formato Feed
            </button>
            <button 
              class="w-full py-3 bg-[#000A1E] text-white rounded-lg font-medium hover:bg-opacity-90 font-inter"
            >
              Formato Story
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const isAuthenticated = ref(false)

onMounted(() => {
  if (process.client) {
    isAuthenticated.value = !!localStorage.getItem('token')
  }
})
</script>

<style scoped>
/* Add any additional styles if needed */
</style> 