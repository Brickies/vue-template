<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank">pwa</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <p>\{{ count }}</p>
    {{#if_not element}}
    <button @click="INCREMENT(2)" style="margin-right: 10px;">INCREMENT</button>
    <button @click="DECREMENT(2)">DECREMENT</button>
    <input v-model="city" style="width: 300px; margin: 0 10px;" placeholder="请输入城市" />
    <button @click="getCityWeather(city)" style="margin-top: 10px;">获取天气</button>
    {{/if_not}}
    {{#element}}
    <el-button @click="INCREMENT(2)" style="margin-right: 10px;">INCREMENT</el-button>
    <el-button type="primary" @click="DECREMENT(2)">DECREMENT</el-button>
    <el-input v-model="city" style="width: 300px; margin: 0 10px;" placeholder="请输入城市" />
    <el-button type="danger" @click="getCityWeather(city)" style="margin-top: 10px;">获取天气</el-button>
    {{/element}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios'

@Component
export default class HelloWorld extends Vue {
  city: string = '上海'

  @Prop() msg: string
  @Getter('count') count: number
  @Mutation('INCREMENT') INCREMENT: Function
  @Mutation('DECREMENT') DECREMENT: Function
  @Action('getTodayWeather') getTodayWeather: Function

  getCityWeather (city: string) {
    this.getTodayWeather({ city: city }).then((res: AxiosResponse) => {
      const { low, high, type } = res.data.forecast[0]
      {{#element}}
      this.$message.success(`${city}今日：${type} ${low} - ${high}`)
      {{/element}}
      {{#if_not element}}
      alert(`${city}今日：${type} ${low} - ${high}`)
      {{/if_not}}
    })
  }
}
</script>

<style lang="scss">
.hello {
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>