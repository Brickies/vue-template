# {{ name }}

> {{ description }}

## 前端技术方案

### 技术栈

- 语言
  - 主语言: typescript、html5
  - 样式: sass
- 数据框架: vue^2.6.10
- 路由: vue-router^3.1.3
- 数据流: vuex^3.1.2
- ajax 框架: axios^0.18.0{{#mtd}}
- 页面组件: @ss/mtd-vue{{/mtd}}
- 脚手架: @vue/cli-service^4.1.0
- 编码规范保障
  - 语法检查: tslint
  - 编辑器整体检查: editorConfig

### 文件结构

- public `静态文件`
- src `主体代码文件`
  - components `通用组件`
  - filters `过滤器`
  - router `路由配置`
  - utils `axios封装(包括request拦截器、response拦截器{{#sso}}、sso接入{{/sso}})、统一错误提示信息， 后期迭代均采用此处的axios`
  - store `数据流相关`
  - utils `工具函数`
  - views `页面`
- tsconfig.json `ts 配置相关`
- tslint.json `tslint 配置相关`
- vue.config.js `webpack 配置相关`

## Git 仓库 分支和提交约定

简要摘录:

- 上线分支: 统一使用 master
  - 注意：master 分支在任何情况下不可用作为提测分支
- 开发集成分支
  - 统一使用 dev
  - 注意：如果团队不使用开发集成分支管理模式，此分支可忽略
- 新需求开发分支
  - feature/{需求 task ID}/{简要描述}
  - 例如：feature/HI-2652/awesome-feature
  - 注意：task ID 以及简要描述中使用短横线 “-”，不要使用下划线“\_”
  - 注意：提测分支应该均来自于此类需求分支
- bug 修复分支
  - bugfix/{bug task ID}/{简要描述}
  - 例如：bugfix/HO-2111/mybad-fix
  - 注意：task ID 以及简要描述中使用短横线 “-”，不要使用下划线“\_”
- 热补分支
  - hotfix/{简要描述}
  - 例如：hotfix/payment-logic-revert
  - 注意：简要描述中的单词之间以短横线“-”分隔，不要使用下划线“\_”

> commit 约定(https://conventionalcommits.org/lang/zh-Hans)

完整格式如下： 其中第一行必填，方括号内选填，注意空行，建议使用`npm run commit`提交代码

```
  <type>[optional scope]: <description>

  [optional body]

  [optional footer]
```

可用的 type 如下：

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- chore: Other changes that don't modify src or test files
- revert: Reverts a previous commit

一些实际的 demo:

```
feat(service): 增加服务新增功能
feat(monitor): 增加监控模块
fix(api): 修复API模块对错误码判断错误导致的权限判断逻辑错误, issue #123
docs: 新增关于git commit message约定的文档
```

{{#papi}}
## mock 数据

- papi 项目 [传送门]()
- papi 用户页面获取 userToken[传送门](http://a.{{ mtHost }}/user/center)
- 本地启动 papi，在根目录下的 `.env.development` 文件中设置好 papi 对应的选项

```
MOCK_URL=http://a.{{ mtHost }} // mock 地址
TARGET_URL=http://xxx.test.{{ mtHost }} // mock 透传地址
```

- 然后在根目录下新建 `.local.json` 文件中配置好 USER_TOKEN 以及 mws 测试环境 ssoid（一定要新建这个文件，否则服务跑不起来）

```json
{
  "USER_TOKEN": "USER_TOKEN", // userToken
  "YUN_PORTAL_SSOID": "YUN_PORTAL_SSOID" // 一朵云测试环境的 ssoid，需要定期进行更新
}
```

{{/papi}}

## 项目启动

``` bash
# 启动项目(使用本地模拟数据)
npm run dev | npm run serve
# 使用tslint校验项目
npm run lint
# 项目构建
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目编码规范

- [代码规范](https://www.npmjs.com/package/tslint-config-standard)
- [开发规范](https://123.{{ mtHost }}/km/page/57983706)
- 文件名规范：全部小写，中横线分隔
- 开发工具推荐使用 `vscode`
  安装插件: `Vetur` 和`Prettier - Code formatter`
  格式化快捷键：`Shift + Option + F`