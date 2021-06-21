<template>
  <n-config-provider :theme="globalTheme">
    <n-global-style />
    <router-view></router-view>
  </n-config-provider>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { NConfigProvider, NGlobalStyle, darkTheme } from 'naive-ui'
export default defineComponent({
  components: {
    NConfigProvider,
    NGlobalStyle,
  },
  setup () {
    return {
      darkTheme,
      globalTheme: ref(darkTheme)
    }
  }
})
</script>
<style lang="scss">
body, html {
  overflow:hidden;
  margin:0;
  padding: 0;
  width:100%;
  height: 100%;
}
</style>
