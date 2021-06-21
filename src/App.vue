<template>
  <router-view/>
</template>
<style lang="scss">
  // Set styles (global)
  body, html {
    overflow:hidden;
  }
  button, button:active, button:focus {
    outline: none !important;
  }
  #app {
    position:relative;
    display: block;
    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: 100vh;
  }
</style>
