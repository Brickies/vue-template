<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
      v-lxclick:bid="obj">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: { HelloWorld }
})
export default class Home extends Vue {
  obj = {
    console: true
  }
}
</script>

<style lang="scss">
.home {
  img {
    cursor: pointer;
  }
}
</style>
