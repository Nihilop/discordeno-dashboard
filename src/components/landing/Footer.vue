<template>
<div class="w-full flex items-center justify-center">
  <div class="md:w-2/3 w-full px-4 flex flex-col pt-20">
    <div class="w-full text-7xl font-bold">
      <h1 class="w-full md:w-2/3 text-3xl">How can we help you. get in touch</h1>
    </div>
    <div class="flex mt-8 flex-col md:flex-row md:justify-between">
      <p class="w-full md:w-2/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, impedit expedita. Quisquam, fuga voluptate. Similique laudantium voluptate cum repellendus quidem inventore quibusdam ratione, odio nulla voluptates, nostrum ipsam? Nostrum, sapiente.</p>
      <div class="w-44 pt-6 md:pt-0">
        <a class="bg-red-500 justify-center text-center text-white rounded-lg shadow px-10 py-3 flex items-center">Contactez nous</a>
      </div>
    </div>
    <div class="flex flex-col">
      
        <div class="flex mt-24 mb-12 mx-auto">
          <n-space>
            <a class="mr-5 cursor-pointer text-gray-400 hover:text-gray-700 uppercase">About</a>
            <a class="mr-5 cursor-pointer text-gray-400 hover:text-gray-700 uppercase">Services</a>
            <a class="mr-5 cursor-pointer text-gray-400 hover:text-gray-700 uppercase">Why us</a>
          </n-space>
        </div>
      <hr class="border-gray-400" />
      <p class="w-full text-center my-12 text-gray-600">Copyright © 2021</p>
    </div>
  </div>
</div>
</template>
<script>
  import { NSpace } from 'naive-ui'
  export default {
    components: {
      NSpace
    }
  }
</script>
<style lang="scss" scoped>
a svg {
  color:inherit
}
</style>

