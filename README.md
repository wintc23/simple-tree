中文文档 | <a href="./README.en-gb.md">English</a>

# simple-tree 树组件文档

 该组件可用于展示和处理树形数据，可以使用npm或者yarn安装到你的项目中进行使用。当然，你可以clone该项目到本地，运行示例查看该组件效果。  
 如果你在使用过程中有新的需求，可以给我提issue；如果你在使用过程中发现代码存在bug或者不完善的地方，欢迎指出或者修正后提交PR，谢谢！

## 功能预览
- 基本操作：增加、删除、修改操作直接修改数据即可，数据控制视图。
- 节点内容自定义：你可以在一个节点中自定义你想展示的内容，比如常见的在节点中增加操作按钮。
- 节点缩进竖线：当树的同一级节点略多的时候，本组件会用不同颜色的竖线来告诉你哪些节点为同一层级，并且这些竖线的颜色你可以自由控制而不一定非得使用默认颜色。
- 缩进控制：如果你在项目中使用过其它的树组件，比如iview或者element-ui的树组件（iview和element-ui是两个非常优秀而全面的前端组件库），就会发现当树的层数增多时，树的宽度固定，这时最深层的节点已经缩进到视窗的最右边，你不得不设置overflow属性来拖动查看完整的节点数据。在本组件中，你不必为这个问题烦恼了，你可以控制每一层缩进的最大距离maxIndent和所有层的最大缩进距离indentLimit，这意味着，如果你设置indentLimit为40，那最深层的缩进距离就是40% x _树宽度_，而每一层的缩进距离都会根据最大缩进距离和层数动态计算。
- 拖动操作：如果你使用过element-ui的树组件，你会发现拖动操作非常难受，拖动的提示仅是一条细线，拖动为子节点和拖为下一节点的区别不明显，而最难受的是拖为子节点和拖为下一节点的操作你得小心翼翼控制鼠标的上下位置，才能拖动到你想要的位置。在本组件中，拖动到相对哪个节点的哪个相对位置你会得到清晰的反馈，并且操作过程会更加舒服。

## 效果预览
本项目的demo，你可以在src/samples/HelloWorld.vue中查看源码。
![demo](./src/assets/tree-sample.gif)

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
最简单的使用例子，这个例子没有任何样式和操作，仅仅展示了树结构的数据，更多功能您可以继续阅读下面的文档查看/src/samples/HelloWorld.vue示例。
```
  <simple-tree
    :treeData="treeData">
  <simple-tree/>
```
### API
注
关于下表中的虚拟DOM的属性说明：  
对于一个节点的虚拟DOM vNode, 你可以通过vNode.nodeData、vNode.parentData分别访问树节点以及其父节点的数据。

#### Props

| props | 说明 | 数据类型 | 默认值 | 备注 |
| ---- | ---- | ---- | ---- | ---- |
| treeData | 表示树形数据的数组 | Array | [] | 每一项为一个对象，包含id、title、chilren(可不含)等属性，键名可自定义 |
| props | 用于自定义树形数据键名 | Object | { id: 'id', title: 'title', children: 'children' } | 如果你的用例中，树节点的名称键名为name，那么你需要设置该属性为 {title：'name'} |
| expand | 显示展开/折叠按钮 | Boolean | true | 如果你不需要展示折叠展开按钮，可以设置此值为false |
| draggable | 是否允许节点拖动 | Boolean | false | 设置该值允许将树组件节点拖动到树的其他节点的相对位置（前、后、子节点） |
| allowDrag | 某节点是否允许拖动 | Function | () => true | 参数：你的节点数据data |
| allowDrop | 是否允许拖动节点在当前节点放下 | Function | () => true | 参数：拖动节点的虚拟DOM dragVNode; 鼠标释放节点的虚拟DOM dropVNode; 相对位置 position, 可选值inner, before, after |
| dragNote | 拖动时释放位置的文字提示 | Object | { before: 'As previous node', after: 'As next node', inner: 'As child node'} | 自定义时需要提供before、after、inner对应的提示 |
| indentLine | 控制缩进竖线的显示以及颜色 | Boolean / Array | false | 可以同过传入一个数组来循环控制每一层缩进的颜色，或者设置该值为true启用默认数组['red', 'green', 'blue] |
| indentLimit | 最大缩进距离 | Number | - | 设置这个值来控制最深层数相对根节点的最大缩进距离，每一层的缩进距离为indentLimit/层数。在层数很多的时候，这个属性对于控制布局非常有用，它能自动调整每一层的缩进距离。值得注意的是，如果该值在100以内，将会按照百分比计算最大缩进距离，100以上则以像素为单位。 |
| maxIndent | 每一层最大缩进距离 | Number | 20 | 在宽度足够的情况下每一层的最大缩进距离，通常可以不用设置 |

#### 节点内容自定义
使用功能强大的slot-scope插槽，可访问节点的数据nodeData以及其父节点数据parentData, 可以使用这个功能给每一个节点添加菜单、定制样式等：
```
<simple-tree :treeData="treeData">
  <div slot-scope="{ parentData, data }">
    {{ data.title }}
  <div>
</simple-tree>
```

#### tree事件
| events | 说明 | 参数 | 备注 |
| ---- | ---- | ---- | ---- |
| content-click | 单击节点内容时触发 | 事件event, 点击节点的虚拟DOM vNode |- |
| content-double-click | 双击节点内容时触发 | 事件event，点击节点的虚拟DOM vNode | - |
| node-click | 单击节点区域时触发，会冒泡到根节点 | 事件event，点击节点的虚拟DOM vNode | 或许大多数时候你需要的是content-click，但是我真的遇到过需要node-click的时候 |
| node-double-click | 双击节点区域时触发，会冒泡到根节点 | 事件event，点击节点的虚拟DOM vNode | - |
| tree-drop | 拖动动作合法完成时触发 | 被拖动节点的虚拟DOM dragVNode, 释放节点的虚拟DOM dropNode， 释放的相对位置position | 大多数情况下，拖动操作关注此事件即可，虽然组件也会弹射其它拖动过程中触发的函数 |
| tree-drag-start | 拖动开始时触发 | 事件event，被拖动节点的虚拟DOM vNode | - |
| tree-drag-end | 拖动结束时触发 | 被拖动节点的虚拟DOM vNode | - |
| tree-drag-enter | 拖动进入一个节点时触发 | 被拖动进入节点的虚拟DOM vNode | -  |
| tree-drag-over | 拖动悬浮在一个节点时触发 | 悬浮所在的节点的虚拟DOM vNode | - |
| tree-drag-leave | 拖动离开一个悬浮的节点时触发 | 离开的悬浮节点的虚拟DOM vNode | - |
| tree-drag-position | 拖动到合法释放位置时触发 | event， position（可选值inner, before, after）| -|

----------

## 安装本项目并查看示例
首先clone本项目到本地，然后执行以下指令。注意：本例基于Vue-cli 3.0。

```
yarn install
yarn serve
```