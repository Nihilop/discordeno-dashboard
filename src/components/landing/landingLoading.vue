<template>
  <div class="loading">
    <div class="content">
      <n-h1>Loading</n-h1>
      <n-spin size="large" />
    </div>
  </div>
</template>
<script>
  
  import { defineComponent } from 'vue'
  import { NSpin, NH1 } from 'naive-ui'
  export default defineComponent({
    name: 'loader',
    layout: 'clear',
    components: {
      NSpin,
      NH1
    },
    setup () {
      return {  
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