<template>
<div class="headerWrapper">
  <n-page-header v-if="$route.name == 'dashboard' ? false : true" :subtitle="$route.name" @back="handleBack" class="pageInfo">
    <template #title>
      <p>{{$store.state.selected_guild.name}}</p>
    </template>
    <template #avatar>
      <n-avatar :style="{ backgroundColor: 'rgba(34,34,34,0.5)' }" v-if="$store.state.selected_guild.icon" :src="`https://cdn.discordapp.com/icons/${$store.state.selected_guild.id}/${$store.state.selected_guild.icon}.png`" />
      <n-avatar :style="{ backgroundColor: 'rgba(34,34,34,0.5)' }" v-else src="https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.png" />
    </template>
  </n-page-header>

  <div class="extra">
    <slot> </slot>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import router from '@/router'
import {
  NAvatar,
  NPageHeader
} from 'naive-ui'
export default defineComponent({
  name: 'HeaderDashboard',
  props: {
    params: Object
  },
  components: {
    NAvatar,
    NPageHeader
  },
  setup () {
    return {
      handleBack () {
        console.log('[onBack]')
        router.push('/dashboard')
      }
    }
  }
})
</script>
<style lang="scss">
.headerWrapper {
  width:100%;
  height:50px;
  display:flex;
  vertical-align: middle;
}
.pageInfo{
  width:auto;
  height:100%;
  margin: auto 3%;
  .n-page-header {
    height: 100%;
  }
}
.extra {
  display: block;
  width: max-content;
  margin:auto 3% auto auto;
  > button {
    margin:auto;
  }
}
</style>
