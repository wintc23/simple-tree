# simple-tree

#### This is a simple component of showing tree data. You can install and use this component in your project by npm or yarn, or you can also setup and run this project to experience the component.

----

## Using in your project

### Step 1
```
yarn add simple-vue-tree --save
```
or
```
npm install simple-vue-tree --save
```

### Step 2
In the entry file main.js, you need to import simple-vue-tree and the styles like:  
```
import 'simple-vue-tree'
import 'simple-vue-tree/dist/lib/simple-tree.css'

```

### Step 3
Then you can using this component by use tag 'simple-tree' in the vue template. The API is following, and you can also find simple usages in the directory 'src/componenets/HelloWorld.vue'.

#

### Tree props
#### treeData <font color="yellow">[Array]</font>
An array of tree node data like:
```
[
  {
    id: 1,
    title: 'node-1'
  },
  {
    id: 2,
    title: 'node-2',
    children: [
      {
        id: 3,
        title: 'node-2-1',
      }
    ]
  }
]
```

#### props <font color="yellow">[Object]</font>
The configuration options of node data. Sometimes your node data is not has same name key as default. Default keys are _id_, _title_, and _children_.
You can use this prop to send your node data keys to the component. For example, your node data is like:
```
{
  id: 1,
  name: 'node-1'
}
```
You need use this prop like:
```
{
  title: 'name'
}
```
Then the key _name_ will be used as the default key _title_.

#### expand <font color="yellow">[Boolean]</font>
Show expand icon. Default value: true.

#### nodeClass <font color="yellow">[Object, Array, String]</font>
The class of node element.

#### draggable <font color="yellow">[Boolean]</font>
You can drag and drop tree nodes by adding a draggable attribute. Default value: false.

#### allowDrag <font color="yellow">[function]</font>
This function will be executed before dragging a node. If false is returned, the node can not be dragged.

params: 
 - data <font color="yellow">[Object]</font> : your node data Object.

#### allowDrop <font color="yellow">[function]</font>
This function will be executed when the a node is dragging over another node. If true is returned, you can choose a position to drop the node and the _tree-drop_ event will emitted and you can handle your tree data in the handle function. If false is returned, the _tree-drop_ event will not be emitted.

params: 
 - dragData <font color="yellow">[Object]</font> : the dragging node data. 
 - dropData <font color="yellow">[Object]</font> : the node data which dragging node droped over.
 - position <font color="yellow">[String]</font> : _before_, _after_, and _inner_ are possible values, which is the relative position of dragging node and drop node. 

#### indentLine <font color="yellow">[Boolean | Array]</font>
This prop is used to show a vertical line before the same level nodes.
Diffrent color lines will be showed before diffrent level nodes according to a color list.
If the value is true, a default color list is ['red', 'green', 'blue'].
And you can also set a customized list to replace the defaule list.

#### maxIndent <font color="yellow">[Number]</font>
This prop is used to control the indent distance of children nodes. If you don't set prop _indentLimit_, the indent distance only depands on _maxIndent_. Default value: 20.

#### indentLimit <font color="yellow">[Number]</font>
This prop is used to limit the max indent distance of the tree.

If there are many node levels, the node will overflow the tree box horizontally.And you can set this prop to avoid this unexpected effect.

Notice: if _indentLimit_ < 100, this prop will be regarded as percentage. In this instance, the value will be _treeWidth _ * _indentLimit_ / 100.

The indent width of each level will be _value_ / _levels_.

---
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```