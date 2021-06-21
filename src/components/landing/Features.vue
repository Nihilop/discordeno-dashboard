<template>
<n-grid :x-gap="0" :y-gap="12" cols="2 400:2 600:3">
  <n-grid-item v-for="item in items" :key="item.id">
    <div class="relative p-4">
      <div class="flex-none lg:flex">
        <div class="h-full w-full mx-auto">
          <img src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="Just a flower" class=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl">
        </div>
       
        <div class="absolute flex space-x-3 text-sm font-medium bottom-0">
          <button class="mb-2 md:mb-0 bg-gray-300 px-5 py-2 shadow-sm tracking-wider text-black rounded-full hover:bg-gray-800" type="button" aria-label="like">{{item.name}}</button>
        </div>
        
      </div>
    </div>
  </n-grid-item>
</n-grid>
</template>

<script>
import {
  NGrid,
  NGridItem
} from 'naive-ui'
export default {
  props: {
    items: {
      type: Object,
      default: []
    }
  },
  components: {
    NGrid,
    NGridItem
  }
}
</script>

