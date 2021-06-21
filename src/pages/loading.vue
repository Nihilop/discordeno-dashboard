<template>
  <div class="loading">
    <div class="content">
      <n-h1>Loading</n-h1>
      <n-spin size="large" />
    </div>
  </div>
</template>
<script>
  
  import { defineComponent, onMounted, ref } from 'vue'
  import { NSpin, NH1 } from 'naive-ui'
  import { useRoute } from 'vue-router'
  import router from '@/router'
  import { connectToDiscord } from '@/utils/discord'
  export default defineComponent({
    name: 'loader',
    layout: 'clear',
    components: {
      NSpin,
      NH1
    },
    setup () {
      const route = useRoute();
      const isLogged = localStorage.accessToken ? true : false
      onMounted(() => {
        if(route.query.code && !isLogged) {
          loginToDiscord(route.query.code)
        } else if (isLogged) {
          setTimeout(() => {
            router.push({path:'/dashboard'}) 
          },1000)
        }
      });

      async function loginToDiscord(arg) {
        const tokenResponse = await connectToDiscord(arg)
        localStorage.accessToken = tokenResponse.access_token
        localStorage.refreshToken = tokenResponse.refresh_token
        setTimeout(() => {
          router.push({path:'/dashboard'}) 
        },1000)
      }


      return { 
        isLogged
      }
    }
  })
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  .content {
    margin:auto;
    text-align: center;
  }
}
</style>