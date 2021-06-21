<template>
  <Suspense>
    <template #default>
      <keep-alive>
        <component :is="theme" />
      </keep-alive>
    </template>
    <template #fallback>
      <landingLoading />
    </template>
  </Suspense>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'
import landingLoading from '@/components/landing/landingLoading.vue'
import landingError from '@/components/landing/landingError.vue'
const config = require('../../settings.json')
// Components imports

const theme1 = defineAsyncComponent({
  loader: () => import('@/components/theme/default.vue'),
  loadingComponent: landingLoading,
  errorComponent: landingError
})
const theme2 = defineAsyncComponent({
  loader: () => import('@/components/theme/index2.vue'),
  loadingComponent: landingLoading,
  errorComponent: landingError
})

export default defineComponent({
  name: 'home',
  layout: 'default',
  components: {
    landingLoading,
    theme1,
    theme2,
  },
  data() {
    return {
      theme: config.theme
    }
  }
})
</script>
