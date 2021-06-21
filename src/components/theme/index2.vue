<template>
  <n-config-provider :theme="globalTheme">
    <n-global-style />
    <n-layout>
      <n-layout-header>
        <n-button @click="globalTheme = darkTheme">dark</n-button>
        <n-button @click="globalTheme = null">Light</n-button>
        {{username}}
      </n-layout-header>
      <n-layout-content content-style="padding: 24px">
        <router-view></router-view>
      </n-layout-content>
      <n-layout-footer>Footer</n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter, NConfigProvider, NGlobalStyle, darkTheme, NButton } from 'naive-ui'
import { getDiscordUser } from '@/utils/discord'
export default defineComponent({
  components: {
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NLayoutFooter,
    NConfigProvider,
    NButton,
    NGlobalStyle,
  },
  setup () {
    const username = ref(null)
    onMounted(() => {
      getUserDiscordName()
    })
    async function getUserDiscordName() {
      const res = await getDiscordUser(localStorage.accessToken)
      console.log(res)
      username.value = res.username
    }
    return {
      username,
      darkTheme,
      globalTheme: ref(darkTheme)
    }
  }
})
</script>
