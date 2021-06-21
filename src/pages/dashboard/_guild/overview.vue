<template>
  <div class="overview">
    <div class="p-10 text-blue-800 grid grid-cols-3 gap-3 grid-rows-3">
     <n-card class="col-start-1 col-span-3" style="border:none">
       <n-h2>{{ $t('dashboard.server.overview_title')}}</n-h2>
       <p style="margin: 15px 0" v-html="$t('dashboard.server.overview_welcomeMsg')"></p>
     </n-card>
     <n-card class="p-5 bg-blue-500"> content 2</n-card>
     <n-card class="row-span-2 p-5 bg-blue-200">Content 3</n-card>
     <n-card class="p-5 bg-blue-500">Content 4</n-card>
     <n-card class="p-5 bg-blue-200">content 5 </n-card>
     <n-card class="p-5 bg-blue-500">card 6</n-card>
     <n-card class="col-start-1 col-span-3 bg-blue-200">card 7</n-card>
   </div>
  </div>
</template>
<script>
import { NH2, NCard } from 'naive-ui'
export default {
  name: 'overview',
  layout: 'dashboard',
  components: {
    NH2,
    NCard
  },
  
}
</script>
<style lang="scss" scoped>
.overview {
  max-width: 1200px;
  margin:auto;
}
</style>
