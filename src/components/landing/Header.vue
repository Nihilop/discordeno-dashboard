<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
import { h, onMounted, ref } from 'vue'
import { NMenu } from 'naive-ui'

export default {
  components: { NMenu },
  setup() {
    return {
      activeKey: null,
      menuOptions: [
        {
          label: () =>
            h( 'a', {
                href: '/',
                rel: 'home',
                style: "display:flex;"
              },
              h( 'img', {
                src: '/img/logo.png',
                rel: 'home',
                style: 'width: 34px; margin: auto 15px',
              }),
            ),
          key: 'Home'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  max-width: 24px;
}
</style>