<template>
<main class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
  <div class="sm:text-center lg:text-left">
    <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
      {{ $t('landing.hero.title') }}
      <br class="xl:hidden" />
      <span class="text-indigo-600">{{ $t('landing.hero.brand') }}</span>
    </h2>
    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">{{ $t('landing.hero.description') }}</p>
    <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
      <div class="rounded-md shadow">
        <a href="#" 
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"> 
          {{ $t('landing.hero.btn1') }}
        </a>
      </div>
      <div class="mt-3 sm:mt-0 sm:ml-3">
        <a href="#" 
          class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"> 
          {{ $t('landing.hero.btn2') }}
        </a>
      </div>
    </div>
  </div>
</main>
</template>

