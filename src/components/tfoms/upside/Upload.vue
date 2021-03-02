<template>
        <el-upload class="center-uploader"
        drag
        :show-file-list=false>
        <font-awesome-icon :icon="['fal', 'cloud-upload']" size="6x" style="position:relative;margin:auto;"/> 
        <div class="el-upload__text">Перетащите сюда или <em>нажмите</em></div>
        <template #tip>
          <ul>
            <li v-bind:key="address.aoid" v-for="address of addresses">{{address.aoguid}}</li>
          </ul>
        </template>
        </el-upload>
</template>
<script>
const axios = require('axios');
export default {
    data() {
      return {
        fileList: [],
        addresses: []
      }
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList
      }
    },
    mounted() {
      axios
      .get('http://127.0.0.1:8090/fias/api/v1.0/ao')
      .then((response) => {
        this.addresses = response.data
        console.log(response)
      });
    }
}
</script>
<style scoped>
.center-uploader {
  margin: auto;
  position: relative;
  width: 360px;
}
</style>