<template>
    <div id="app">
      <div class="main-menu">
        <MainMenu></MainMenu>
      </div>
      <div class="content">
        <TFOMSComponent></TFOMSComponent>
      </div>
  </div>
</template>
<script>
import TFOMSComponent from './components/tfoms/Content.old.vue'
import MainMenu from './components/MainMenu.vue'
export default {
    components: {
      MainMenu,
      TFOMSComponent
    }
  }
</script>
<style>
  html, body {
    height: 100%;
    width:  100%;
    margin: 0;
  }
  #app {
    height: 100%;
    width:  100%;
    position: relative;
  }
  .main-menu {
    width:  100%;
    position: relative;
  }
  .content {
    height: 93%;
    width: 100%;
    position: relative;
  }
</style>
