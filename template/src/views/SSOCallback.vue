<template>
</template>
<script lang="ts">
import axios from 'axios'
import sso from '@/utils/sso'
import { Component, Vue } from 'vue-property-decorator'
import Util from '@/utils'

@Component
export default class SSOCallback extends Vue {
  created () {
    // 获取当前页面url的code参数（即Service Ticket，是SSO系统返回给业务方的登录凭证
    const code = Util.queryString('code')
    axios.get(`/callback/login`, {
      params: { code },
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(res => {
      if (res.data.code === 0) {
        sso.setSsoid(res.data.data.ssoid)
        // 重定向到上次退出时的URL
        window.location.href = sso.getCurrentURL()
      }
    }).catch(error => {
      alert(error.message)
    })
  }
}
</script>
