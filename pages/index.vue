<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-gradient-to-r from-[#013DB2] to-[#0156FC] px-8 py-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="text-white text-2xl font-bold">
          LOGO
        </div>
        
        <!-- CTA Button -->
        <button class="px-6 py-2 bg-white text-[#013DB2] rounded-lg font-medium hover:bg-opacity-90">
          Get Started
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="container mx-auto py-16 px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Mockup Image -->
        <div>
          <img src="/images/mockup.png" alt="Product Mockup" class="w-full"/>
        </div>

        <!-- Hero Content -->
        <div class="space-y-6">
          <h1 class="text-[#0258FD] text-4xl md:text-5xl font-bold">
            Your Compelling Title
          </h1>
          <p class="text-[#242E42] text-[1.25rem]">
            Your engaging paragraph goes here. Make it compelling and focused on your value proposition.
          </p>
          <button class="px-8 py-3 bg-[#000A1E] text-white rounded-lg font-medium hover:bg-opacity-90">
            Call to Action
          </button>
        </div>
      </div>
    </section>

    <!-- Pre-register Section -->
    <section class="bg-gradient-to-br from-[#00030A] to-[#242E42] py-16 px-8">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-6">
          <h2 class="text-[#F5F7FA] text-4xl font-bold">
            Pre-register Now
          </h2>
          <p class="text-[#ACB9D2] text-lg">
            Join us early and get exclusive benefits when we launch.
          </p>
        </div>

        <!-- Registration Form -->
        <div class="bg-white rounded-[2rem] p-[2rem] shadow-lg">
          <form class="space-y-6">
            <div class="space-y-2">
              <label class="block text-[#242E42] font-medium">Nome</label>
              <input 
                type="text" 
                placeholder="Como podemos te chamar?"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
              >
            </div>

            <div class="space-y-2">
              <label class="block text-[#242E42] font-medium">E-mail</label>
              <input 
                type="email" 
                placeholder="Digite seu melhor e-mail"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
              >
            </div>

            <div class="space-y-2">
              <label class="block text-[#242E42] font-medium">Número para contato</label>
              <input 
                type="tel" 
                placeholder="Vamos te procurar no Whatsapp"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0258FD]"
              >
            </div>

            <button 
              type="submit"
              class="w-full py-3 bg-[#0258FD] text-white rounded-lg font-medium hover:bg-opacity-90"
            >
              Pre-register
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template> 