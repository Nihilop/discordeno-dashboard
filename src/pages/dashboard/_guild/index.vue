<template>
  <div class="index_failed">
    <n-result
      class="messageWarning"
      status="warning"
      title="Attention"
      description="Mauvaise page redirigée"
    >
      <template #footer>
        <n-button @click="goTo">Retour au Dashboard</n-button>
      </template>
    </n-result>
  </div>
</template>
<script>
import { NResult, NButton } from 'naive-ui'
export default {
  name: 'index',
  layout: 'dashboard',
  components: {
    NResult,
    NButton
  },
  methods: {
    goTo() {
      this.$router.push('/dashboard')
    }
  }
  
}
</script>
<style lang="scss" scoped>
.index_failed {
  position:relative;
  display:flex;
  vertical-align:middle;
  justify-content:center;
  padding: 10% 0;
  width:100%;
  height: 100%;
  .messageWarning {
    margin:auto;
  }
}
</style>
