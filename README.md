# vue webpack 模板

> 一个集成了 webpack + vue-loader + vuex + axios 的自定义 vue-cli 模板，其中包含 webpack 热更新，linting，测试以及 css 处理器等内容

> 该模板兼容 Vue2.0 . 对于 Vue1.x，执行命令：`vue init Brickies/vue-template#1.0 my-project`

英文文档 : [English Doc](https://github.com/Brickies/vue-template/blob/master/README_en-US.md)

## 用法

这是一个 [vue-cli](https://github.com/vuejs/vue-cli) 的项目模板 . **建议使用 npm3+ 进行依赖的安装**

``` bash
$ npm install -g vue-cli
$ vue init Brickies/vue-template my-project
$ cd my-project
$ npm install
$ npm run dev
```

默认情况下，本地开发服务器将在 8080 端口运行 . 如果该端口已在你机器上运行，那么将会自动使用下一个空闲端口 .

## 包含的内容

- `npm run dev`: 本地开发命令
  - Webpack + `vue-loader` 用于单文件 Vue 组件
  - 实时热更新
  - 实时编译错误覆盖
  - eslint 实时检测
  - Source maps

- `npm run build`: 打包命令
  - JavaScript 文件使用 [UglifyJS v3](https://github.com/mishoo/UglifyJS2/tree/harmony) 进行压缩 .
  - HTML 文件使用 [html-minifier](https://github.com/kangax/html-minifier) 进行压缩 .
  - 所有组件中的 CSS 打包到单个文件并使用 [cssnano](https://github.com/ben-eb/cssnano) 进行压缩 .
  - 静态资源使用 hash 编译以实现有效的长期缓存，以及在打包自动生成的 `index.html` 文件中为这些资源进行自动引用 .
  - 使用 `npm run build --report` 进行打包分析

- `npm run unit`: 在 [JSDOM](https://github.com/tmpvar/jsdom) 中使用 [Jest](https://facebook.github.io/jest/) 进行单元测试，或者在 PhantomJS 中使用 Karma + Mocha + karma-webpack 进行单元测试.
  - 测试文件支持 ES2015 + .
  - 容易 mocking .

- `npm run e2e`: 使用 [Nightwatch](http://nightwatchjs.org/) 进行端对端测试 .
  - 测试并行运行在多个浏览器中 .
  - 使用一个命令就可做到开箱即用:
    - 自动处理 Selenium 和 chromedriver 的依赖关系 .
    - 自动生成 Selenium 服务 .

### 将项目 fork 下来做一个属于自己的

你可以通过 fork 该项目然后去创建一个属于你自己的模板, 并配合 `vue-cli` 进行使用:

``` bash
vue init username/repo my-project
```

### 特别感谢

[vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)
