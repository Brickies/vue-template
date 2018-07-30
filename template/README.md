# {{ name }}

> {{ description }}

## Build Setup

``` bash
# 启动项目(使用本地模拟数据)
npm run dev | npm run serve
# 使用tslint校验项目
npm run lint
# 项目构建
npm run build
{{#e2e}}
# 运行端对端测试
npm run test:e2e
{{/e2e}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
