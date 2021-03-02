<template>
        <div class="upper-panel">
          <div class="upload"><Upload></Upload></div>
          <div class="history"><History></History></div>
        </div>
        <div class="ground-panel">
          <Log></Log>
        </div>
</template>

<script>
import History from './upside/History.vue'
import Upload from './upside/Upload.vue'
import Log from './groundside/Log.vue'

export default {
    name: 'TFOMSContent',
    props: {
    },
    components: {
      History, 
      Upload,
      Log
    }
}
</script>

<style scoped>
  .upper-panel {
    max-height: 40%;
    height: 40%;
    width: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    margin-bottom: 2px;
  }
  .upload {
    height: 100%;
    width: 65%;
    position: relative;
    display: flex;
  }
  .history {
    width: 35%;
    overflow: inherit;
    background-color: white;
    display: flex;
  }
   .ground-panel {
    max-height: 60%;
    height: 60%;
    width: 100%;
    position: relative;
    background-color: white;
    display: flex;
  }
</style>
