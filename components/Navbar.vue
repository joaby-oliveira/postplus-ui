<template>
  <nav class="bg-gradient-to-r from-[#013DB2] to-[#0156FC] px-8 py-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div>
        <img src="/images/logo.svg" alt="Logo" class="h-8"/>
      </div>
      
      <!-- CTA Button -->
      <NuxtLink 
        to="/signup" 
        class="px-6 py-2 bg-white text-[#013DB2] rounded-lg font-medium hover:bg-opacity-90 font-inter"
      >
        Acessar
      </NuxtLink>
    </div>
  </nav>
</template> 