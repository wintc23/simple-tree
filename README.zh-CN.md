中文文档 | <a href="./README.md">English</a>

# simple-tree 树组件文档

### 该组件可用于展示和处理树形数据，可以使用npm或者yarn安装到你的项目中进行使用。当然，你可以clone该项目到本地，运行示例查看该组件效果。

----

## 在项目中使用
### 第一步：在项目中安装
```
yarn add simple-vue-tree --save
```
或者
```
npm install simple-vue-tree --save
```

### 第二步：在入口文件main.js引入组件
在入口文件中，你需要引入组件以及组件样式：
```
import 'simple-vue-tree'
import 'simple-vue-tree/dist/lib/simple-tree.css'

```

### 第三步：使用
安装、引入完成后，就可以在项目中使用simple-tree组件啦  
最简单的使用例子，这个例子没有任何样式和操作，仅仅展示了树结构的数据，更多功能您可以继续阅读下面的文档查看/src/components/HelloWorld.vue示例。
```
  <simple-tree
    :treeData="treeData">
  <simple-tree/>
```
---
### API
---
### Props

注
- 关于下表中的虚拟DOM的属性说明：  
对于一个节点的虚拟DOM vNode, 你可以通过vNode.node

| props | 说明 | 数据类型 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| treeData | 表示树形数据的数组 | Array | [] | 每一项为一个对象，包含id、title、chilren(可不含)等属性，键名可自定义 |
| props | 用于自定义树形数据键名 | Object | { id: 'id', title: 'title', children: 'children' } | 如果你的用例中，树节点的名称键名为name，那么你需要设置该属性为 {title：'name'} |
| expand | 显示展开/折叠按钮 | Boolean | true | 如果你不需要展示折叠展开按钮，可以设置此值为false |
| draggable | 是否允许节点拖动 | Boolean | false | 设置该值允许将树组件节点拖动到树的其他节点的相对位置（前、后、子节点） |
| allowDrag | 某节点是否允许拖动 | Function | () => true | 参数：你的节点数据data |
| allowDrop | 是否允许拖动节点在当前节点放下 | Function | () => true | 参数：拖动节点的虚拟DOM dragVNode; 鼠标释放节点的虚拟DOM dropVNode; 相对位置 position, 可选值inner, before, after |