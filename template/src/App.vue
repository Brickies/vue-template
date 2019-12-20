<template>
  <div id="layout" class="onecloud-page">
    <div id="navbar">
      <!-- 顶导渲染容器，必须有id属性 -->
    </div>
    <div class="onecloud-wrapper">
      <div id="sidebar">
        <!-- 侧导渲染容器，必须有id属性 -->
      </div>
      <div class="onecloud-content-wrapper">
        <!-- 业务容器，该容器id或者class属性可自定义 -->
        <div id="app">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { isEmpty } from 'lodash'
import scriptjs from 'scriptjs'
import { LX_CIDS } from '@/utils/config'

@Component
export default class App extends Vue {
  systemSlug: string = 'AVATAR' // 作为接入导航的唯一标识
  menuSlug!: string // 左侧侧导选中的唯一标识
  canDrag: boolean = true // 摩西机器人拖动标记

  $OneCloudNavbar: any
  $OneCloudSidebar: any

  @Getter('userinfo') userinfo: any

  @Watch('$route', { deep: true })
  onRouteChanged () {
    this.setMenuSlug()
  }

  created () {
    const css = '//mwssdk.{{ mtHost }}/one_cloud.css'

    // 动态加载 CSS
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = css
    head.appendChild(link)
  }

  mounted () {
    // const res = '//msstest-corp.{{ mtHost }}/v1/mss_7aa325e2a1464c61adacf4ed1319e471/portal/onecloud/one_cloud.js'
    const res = '//mwssdk.{{ mtHost }}/one_cloud.js'

    // 注释3.1： 获取导航的systemSlug
    // const systemSlug: string = this.systemSlug
    // 注释3.2： 设置当前顶导的系统名称
    document.title = 'AVATAR'

    const self: any = this

    // 注释3.3： 加载导航JS SDK文件
    scriptjs(res, () => {
      const global: any = window
      const Navbar: any = global.OneCloud.Navbar
      const Sidebar: any = global.OneCloud.Sidebar

      /* 注释3.4： 初始化顶部导航实例 */
      const navbar = new Navbar({
        // 承载顶部导航的容器
        data: {
          name: 'AVATAR',
          link: 'https://avatar.mws.{{ mtHost }}/',
          systemSlug: self.systemSlug,
          withIAM: false
        },
        // onServiceEnter: function (router: string) {
        //   /* 可自行实现服务跳转拦截后的业务逻辑 */
        // },
        /* 注释3.5：如果接入IAM，需要监听顶部项目的切换  */
        onProjectSwitch (project: any) {
          // IAM
        }
      })

      /* 注释3.5：顶部导航渲染 */
      navbar.render()

      /* 注释4.2： 初始化侧导实例 */
      const sidebar = new Sidebar({
        // 承载左侧菜单导航的容器
        data: {
          systemSlug: self.systemSlug
        },
        onMenuSelect: function (menu: any) {
          if (menu) {
            self.$router.push(menu.link)
          }
        }
      })

      /* 注释4.3：侧导渲染 */
      sidebar.render()

      // 将顶导、侧导实例绑定到vue实例上，用于vue routerChange等过程中的调用
      self.$OneCloudNavbar = navbar
      self.$OneCloudSidebar = sidebar
      this.setMenuSlug()
    })

    this.init()
  }

  setMenuSlug () {
    /* 获取到当前路由对应的menuSlug */
    this.menuSlug = this.$route.meta.menuSlug
    if (this.$OneCloudSidebar) {
      /* 当已初始化实例后，路由切换时，需切换侧导实例的menuSlug信息 */
      if (!isEmpty(this.menuSlug)) {
        this.$OneCloudSidebar.data.menuSlug = this.menuSlug
      }
    }
  }

  init () {
    this.setMoxi()
    let timer = setInterval(() => {
      if (window['LXAnalytics']) {
        this.uploadLXAnalytics(this.$route)
        this.$router.afterEach((to, from) => {
          this.uploadLXAnalytics(to)
        })
        clearInterval(timer)
      }
    }, 50)
  }

  // 上报埋点
  uploadLXAnalytics (to) {
    let toName = to.name
    const id = LX_CIDS[toName as string]
    if (!id) {
      return
    }
    const valLab = {}
    const uid = this.userinfo.login_name
    valLab['custom'] = {
      organization: this.userinfo.organization
    }
    // console.log(uid, valLab)
    window['LXAnalytics']('set', 'uid', uid)
    window['LXAnalytics']('pageView', valLab, null, id)
  }

  // 接入摩西机器人
  setMoxi () {
    const self = this;
    (function (userId) {
      let script = document.createElement('script')
      script.id = 'moses-chat__view'
      script.src = 'https://s3plus.{{ mtHost }}/v1/mss_c9d411db85ec4b59aaebc4dfca416c55/production/moses-client/entry.js'
      script.setAttribute('version', '1.0.0')
      script.setAttribute('domain', 'https://moses.{{ mtHost }}')
      script.setAttribute('robotKey', 'a75dc167-2c9d-4731-b3a6-efd2f5153bb8')
      let _params = {
        appInfo: {
          robotKey: 'a75dc167-2c9d-4731-b3a6-efd2f5153bb8'
        },
        userInfo: {
          userId: userId
        }
      }
      let params = encodeURIComponent(JSON.stringify(_params))
      script.setAttribute('params', params)
      document.body.appendChild(script)
      setTimeout(() => {
        self.moxiDrag()
      }, 1000)
    })(this.userinfo.login_name)
  }

  moxiDrag () {
    const moxi: any = document.getElementsByClassName('moses-icon')[0]
    moxi.addEventListener('mousedown', event => {
      const style = window.getComputedStyle ? window.getComputedStyle(moxi, null) : null || moxi.currentStyle
      let right = ~~style.right.split('px')[0]
      let bottom = ~~style.bottom.split('px')[0]

      const e: any = event
      const downX = e.clientX
      const downY = e.clientY

      e.stopPropagation()
      this.canDrag = true

      document.onmousemove = ev => {
        if (!this.canDrag) return false
        const e: any = ev
        const nowX = e.clientX
        const nowY = e.clientY
        const distanceX = nowX - downX
        const distanceY = nowY - downY
        moxi.style.right = right - distanceX + 'px'
        moxi.style.bottom = bottom - distanceY + 'px'
        return false
      }

      document.onmouseup = ev => {
        this.canDrag = false
      }
    }, true)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
