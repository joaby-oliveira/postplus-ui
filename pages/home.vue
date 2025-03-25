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
              @click="downloadFeedImage('/images/mockup.png')"
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
import { ref } from 'vue'

const isAuthenticated = ref(false)

onMounted(() => {
  if (process.client) {
    isAuthenticated.value = !!localStorage.getItem('token')
  }
})

const downloadFeedImage = async (imageUrl) => {
  const token = localStorage.getItem('token')

  if (!token) {
    console.error('No token found')
    return
  }

  // Decode the JWT token to get the company ID from the sub field
  const payload = JSON.parse(atob(token.split('.')[1]))
  const companyId = payload.sub

  try {
    // Fetch company data to get the logo URL
    const response = await fetch(`http://localhost:3000/companies/${companyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch company data')
    }

    const data = await response.json()
    const logoUrl = data.logoUrl // Get the logo URL from the response

    // Load the images
    const [backgroundImage, logoImage] = await Promise.all([
      loadImage(imageUrl),
      loadImage(logoUrl)
    ])

    // Create a canvas to draw the images
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Set canvas dimensions
    canvas.width = backgroundImage.width
    canvas.height = backgroundImage.height

    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0)

    // Draw the logo image (adjust the position and size as needed)
    const logoWidth = 100; // Set desired logo width
    const logoHeight = (logoImage.height / logoImage.width) * logoWidth; // Maintain aspect ratio

    // Set the position for the logo with padding
    const logoX = 5; // 5px padding from the left
    const logoY = canvas.height - logoHeight - 1; // 1px padding from the bottom

    ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight)

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png')

    // Create a link to download the image
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'mixed_image.png' // Set the desired file name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}

// Helper function to load an image
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // Set CORS attribute
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
  })
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style> 