<template>
  <div class="home">
    <img src="../assets/logo.png">
    <p>\{{ count }}</p>
    <button @click="INCREMENT(2)" style="margin-right: 10px;">INCREMENT</button>
    <button @click="DECREMENT(2)">DECREMENT</button>
    <input v-model="city" placeholder="请输入用户名" />
    <button @click="getCityWeather(city)" style="margin-top: 10px;">获取天气</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import { AxiosResponse } from 'axios'

@Component
export default class HelloWorld extends Vue {
  city: string = '上海'

  @Getter('count') count: number
  @Mutation('INCREMENT') INCREMENT: Function
  @Mutation('DECREMENT') DECREMENT: Function
  @Action('getTodayWeather') getTodayWeather: Function

  getCityWeather (city: string) {
    this.getTodayWeather({ city: city }).then((res: AxiosResponse) => {
      const { low, high, type } = res.data.forecast[0]
      alert(`${city}今日：${type} ${low} - ${high}`)
    })
  }
}
</script>
