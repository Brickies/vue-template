<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <p style="margin: 15px 0;">\{{ count }}</p>
    <el-button icon="el-icon-remove-outline" style="margin-right: 10px;" @click="decrement(2)">DECREMENT</el-button>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="increment(2)">INCREMENT</el-button>
    <el-input v-model="city" style="width: 300px; margin: 0 10px;" placeholder="请输入城市" />
    <el-button type="danger" @click="getCityWeather(city)" style="margin-top: 10px;">获取天气</el-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      city: '上海'
    }
  },
  computed: {
    ...mapGetters('Home', [
      'count'
    ])
  },
  methods: {
    ...mapMutations('Home', {
      increment: 'INCREMENT',
      decrement: 'DECREMENT'
    }),
    ...mapActions('Home', [
      'getTodayWeather'
    ]),
    getCityWeather (city) {
      this.getTodayWeather({ city: city }).then(res => {
        const { low, high, type } = res.data.forecast[0]
        this.$message({
          type: 'success',
          message: `${city}今日：${type} ${low} - ${high}`
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  font-size: 16px;
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
</style>
