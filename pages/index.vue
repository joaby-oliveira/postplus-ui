<template>
  <div>
    <Navbar />
    <!-- Hero Section -->
    <section class="container mx-auto py-16 px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Mockup Image -->
        <div>
          <img src="/images/mockup.png" alt="Mockup" class="h-[500px] w-[500px] rounded-lg shadow-lg object-cover object-center"/>
        </div>

        <!-- Hero Content -->
        <div class="space-y-6">
          <h1 class="text-[#0258FD] text-4xl md:text-5xl font-bold font-geologica">
            Artes em segundos
          </h1>
          <p class="text-[#242E42] text-[1.25rem] font-inter">
            A Post Plus é a solução que pequenas empresas buscavam para ter artes criativas para suas redes sociais de forma instantânea, automatizada e acessível.
          </p>
          <button class="px-8 py-3 bg-[#000A1E] text-white rounded-lg font-medium hover:bg-opacity-90 font-inter">
            Começar agora
          </button>
        </div>
      </div>
    </section>

    <!-- Pre-register Section -->
    <section class="bg-gradient-to-br from-[#00030A] to-[#242E42] py-16 px-8">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left Content - Updated with text-right alignment -->
        <div class="space-y-2 text-right flex flex-col items-end">
          <h2 class="text-[#F5F7FA] text-[4rem] font-bold font-geologica">
            Pré-registro
          </h2>
          <p class="text-[#ACB9D2] text-lg font-inter max-w-[500px]">
            Nosso software ainda está sendo desenvolvido, preencha os seus dados para entrarmos em contato e te dar acesso privilegiado para ser um dos primeiros a usá-lo
          </p>
        </div>

        <!-- Registration Form -->
        <div class="bg-white rounded-[2rem] p-[2rem] shadow-lg">
          <form class="space-y-6 font-inter">
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
              Começar agora
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Add these custom font family utilities to your existing styles */
.font-geologica {
  font-family: 'Geologica', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}
</style> 