<template>
  <div class="login">
    
    <n-h2 v-if="isLogged">Je vois que vous êtes déjà connecter</n-h2>
    <router-link class="goDashboard" v-if="isLogged" to="/loading">Configure ton bot !</router-link><br />
    <p v-if="isLogged">ou</p>
    <n-button v-if="isLogged" type="error" @click="disconnect">Se deconnecter</n-button><br />
    
    <a class="goDashboard" v-if="!isLogged" href="https://discord.com/api/oauth2/authorize?client_id=853989097219948545&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Floading&response_type=code&scope=identify%20guilds">Login</a>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { NButton, NModal, NCard, NH2 } from 'naive-ui'

export default defineComponent({
  name: 'login',
  layout: 'default',
  components: {
    NButton,
    NModal,
    NCard,
    NH2
  },
  setup() {
    function disconnect() {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      router.push('/')
    }
    return {
      disconnect,
      isLogged: localStorage.accessToken ? true : false
    } 
  }
})
</script>
<style lang="scss" scoped>
.login {
  text-align:center;
}
.goDashboard {
  display: block;
  text-decoration:none;
  width:fit-content;
  margin:24px auto 0 auto;
  color: white;
  padding: 12px 54px;
  border-radius: 9px;
  background:#2ecc71;
  &:hover {
    background: darken(#2ecc71, 5%)
  }
}
</style>
