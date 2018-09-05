# cTabs

基于 `element-ui@2.4.2`

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------ | :------ | :------ | :------ | :------ |
| list | 标签页数据（必须） | array | — | —
| type | 风格类型 | string | card/border-card | —
| value | 绑定值，选中选项卡的 path（推荐不传）| string | — | 会自动根据路由判断
| tab-position | 选项卡所在位置 | string | top/right/bottom/left | top
| stretch | 标签的宽度是否自撑开 | boolean | — | false
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) | — | —

## list

``` javascript
list: [{
  label: '<i class="el-icon-edit"></i>foo', // 必须
  path: '/foo', // 必须
  disabled: false, // 不传则为 false
}]
```

## example

``` javascript
<template>
  <div id="app">
    <c-tabs :list="list" />
    <c-tabs :list="list" type="border-card" />
    <c-tabs :list="list" tab-position="top" :stretch="true"/>
    <c-tabs :list="list" tab-position="left" />
    <router-view />
  </div>
</template>

<script>
import cTabs from './components/cTabs.vue'

export default {
  name: 'app',
  data () {
    return {
      list: [{
        label: '<i class="el-icon-edit"></i>foo',
        path: '/foo',
        disabled: true,
      },{
        label: 'bar',
        path: '/bar'
      }]
    }
  },
  components: {
    cTabs
  }
}
</script>
```

- 访问 `/bar` 则自动选中 `bar`
- 点击 `bar` 则跳转 `/bar`