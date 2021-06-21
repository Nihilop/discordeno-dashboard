<template>
  <div class="rank">
    <n-list>
      <template #header> <n-h2 class="title">{{ $t('dashboard.menu.rank') }}</n-h2> </template>
      <template #footer> 
        <div class="spinnerInfinitScroll">
          <n-spin class="spin" size="small" />
          {{ $t('utils.loading') }}
        </div>
      </template>
      <n-list-item v-for="(members, index) in 10" :key="index">
        <template #prefix>
          <n-avatar src="https://www.slate.fr/sites/default/files/styles/1060x523/public/avatar_1.jpg"> </n-avatar>
        </template>
        <template #suffix>
          <n-button> #RANK_NUMBER</n-button>
        </template>
        <n-thing title="Thing" title-extra="extra" description="description">
          Pseudo - <span>Role List...</span>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>
<script>
import { NH2, NList, NListItem, NAvatar, NSpin } from 'naive-ui'
export default {
  name: 'rank',
  layout: 'dashboard',
  components: {
    NH2,
    NList,
    NListItem,
    NAvatar,
    NSpin
  },
  
}
</script>
<style lang="scss" scoped>
.rank {
  max-width:1200px;
  margin:auto;
  .title {
    text-transform: uppercase;
    font-weight: 200;
  }
}
.spinnerInfinitScroll {
  display: flex;
  flex-direction: column;
  justify-content: center;
  vertical-align: middle;
  margin: 24px auto;
  width:max-content;
  .spin {
    position:relative;
    display: block;
    margin:15px auto;
  }
}
</style>
