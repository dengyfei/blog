---
title: react
date: 2022-10-21 12:44:15
tags:
  - 'react'
categories:
  - 'react'
---

::: tip
:star:前言

React 作为和 Vue、Angular 并驾齐驱的前端三大主流框架之一，其地位自然不言而喻，很多大厂都选择使用 React 作为日常开发的框架，很多程序员也都偏爱 React，主要原因在于 React 使用的 JSX(一种酷似 JavaScript 的语言)编写，导致 React 的灵活性是其他两大框架所无法匹敌的。而且 Vue 和 Angular 中很多的思想都是借鉴 React。所以，每个致力于献身前端事业的小伙伴都是有必要了解 React 的。
:::

## 启动项目

React 使用的脚手架是`create-react-app`，并且默认使用`yarn`作为包管理工具。因此，开发前我们需要执行以下命令在全局安装这两个工具：

```js
npm install -g yarn
npm install -g create-react-app
```

然后就可以执行下面命令创建一个 React 工程了：

```js
create-react-app 项目名
```

创建好的项目路径如下：

```js
|-- public
|   |-- favicon.ico
|   |-- index.html
|   |-- logo192.png
|   |-- logo512.png
|   |-- manifest.json
|   |-- robots.txt
|
|
|-- src
|   |-- App.css
|   |-- App.js
|   |-- App.test.js
|   |-- index.css
|   |-- index.js
|   |-- logo.svg
|   |-- reportWebVitals.js
|   |-- setupTests.js
|
|
|-- package-lock.json
|-- package.json
|-- README.md
```

- `public`: 该目录下主要用于存放一些静态资源
- `src/App.js`: App 组件相关的代码
- `src/index.css`: 全局样式文件
- `src/index.js`: 整个应用程序的入口文件
  首先我们可以进入到全局入口文件`src/index.js`中，里面的主体代码大致是下面这样

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

可以看到，`src/index.js`中只做了一件事，就是将 App 组件挂到了`id = root`的 DOM 元素上，接下来我们要做的，就是在 APP 组件中开发定制功能。
而在 React 中，组件可以使用类和函数的方式开发。

## 组件化开发

### 类组件

```jsx
import { Component } from 'react'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'tom',
    }
  }
  render() {
    return <div> {this.state.name} </div>
  }
}
```

::: tip
类组件的特点

1、类组件必须继承 React.Component

2、constructor 是可选的，通常用于初始化一些数据

3、this.state 用于维护组件内的数据

4、render 函数是类组件中唯一必须实现的方法
:::

### 函数式组件

```jsx
export default function App(props) {
  return <div> hello react </div>
}
```

::: tip
函数式组件的特点

1、没有生命周期函数

2、没有 this 对象

3、没有内部状态(state)
:::

::: warning
:bulb: 注意: 对于定义在类组件的 render 函数，不支持显示对象类型的数据，以下代码，react 内部会抛出异常
:::

```jsx
import React, { Component } from 'react'

export default class app extends Component {
  constructor() {
    super()
    this.state = {
      person: {
        name: 'tom',
        age: 13,
      },
    }
  }
  render() {
    return <div>{this.state.person}</div>
  }
}
```

![react_error](./image/react/react_error.png)

## 状态管理

在类组件的`constructor函数`中，`this.state`对象用来维护组件内的状态的。在开发中，如果我们直接修改`state`，React 内部并不能检测到状态发生了变化，也就不会重新渲染界面。因此，React 推荐我们使用`setState函数`修改状态。`setState函数`并不需要我们定义，它是继承自`React.Component`。
::: warning
`setState函数`要求传入两个参数。第一个参数是必须的，可以是一个对象或者函数，如果是一个函数，则必须返回一个对象。对象的属性表明要更新的数据。第二个参数是可选参数，要求传入一个函数，在该函数中可以获取本次更新后的状态。
:::

```jsx
import React, { Component } from 'react'

export default class app extends Component {
  constructor() {
    super()
    this.state = {
      name: 'tom',
    }
  }
  render() {
    setTimeout(() => {
      this.state = { name: 'jake' }
    }, 0)
    return <div>{this.state.name}</div>
  }
}
```

此时界面上依然展示的是 tom，而不是 jake

```jsx
import React, { Component } from 'react'

export default class app extends Component {
  constructor() {
    super()
    this.state = {
      name: 'tom',
    }
  }
  render() {
    setTimeout(() => {
      this.setState({ name: 'jake' })
    }, 0)
    return <div>{this.state.name}</div>
  }
}
```

此时界面上显示的是 jake

### setState 是异步更新的

```jsx
import React, { Component } from 'react'

export default class app extends Component {
  constructor() {
    super()
    this.state = {
      name: 'tom',
      age: 18,
    }
  }
  render() {
    return (
      <div>
        {this.state.name}
        <button onClick={(e) => this.changeName()}>改变姓名</button>
      </div>
    )
  }
  changeName() {
    this.setState({
      name: 'jake',
    })
    console.log(this.state) // {name: tom, age:18}
  }
}
```

上面的代码执行后，即使界面上已经显示 jake 了，但是 setState 后面的打印却依旧是前一次的状态。可见 setState 是异步的。

::: danger
setState 设置为异步的原因

**1. 提升性能：** 如果 setState 是同步的，那么每次调用 setState 都会立马更新，意味着 render 函数会被频繁调用，界面就会不断的重新渲染，这样的效率是很低的。

**2.确保 state 和 props 保持同步：** react 中的 render 函数会比 setState 稍慢一些，如果立即更新了 state，但还没执行 render 函数，即在 setState 函数刚刚执行完的那一刻，state 和 props 是一致的。
:::
但如果 setState 是异步的，我们什么时候才能获取到更新后的状态呢？这里提供两种方案。

**通过回调函数** 前面提到过 setState 接收的第二个参数，这个参数需要传一个函数，并且在这个函数当中是可以获取到组件更新后的状态的。上面的代码如果这样写，就可以获取到最新的值

```jsx
changeName () {
    this.setState(
      {
        name: 'jake'
      },
      () => {
        console.log(this.state)  // {name: jake, age: 18}
      }
    )
  }
```

**通过生命周期函数** 在 react 中，组件的状态更新后，都会立马调用`componentDidUpdate`的[生命周期函数](#1)，在这个函数中也可以获取到组件本次更新的状态

### setState 数据的合并

上面例子中，我们通过 setState 更新组件状态时，传给了 setState 一个`{name: jake}` 的参数，参数里面并没有包含 age 属性，但是更新后的状态里面依旧包含了 age 属性。我们把 setState 的这种特性称为 **setState 的数据合并。**

那么为什么会有这种特性呢？这还得从 react 源码分析。react 在执行 setState 时，最后会通过`Object.assign`来合并数据的。比如上面的代码，react 内部最后会执行

```js
return Object.assign({}, this.state, { name: 'jake' })
```

这样，返回的对象中就包含了`this.state`中的所有属性。

### setState 的合并

setState 除了有数据合并的特性，其本身也是具有合并特性的。

```jsx
import React, { Component } from 'react'

export default class app extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }
  render() {
    return (
      <div>
        <h2>当前计数： {this.state.count}</h2>
        <button onClick={(e) => this.increment()}>增加</button>
      </div>
    )
  }
  increment() {
    this.setState({ count: this.state.count + 1 })
    this.setState({ count: this.state.count + 2 })
  }
}
```

上面代码执行后，界面的数字是 2，而不是预期的 3。这是由于当多个连续`setState函数`传入的参数均为对象时，react 内部会把这些参数统一放到一个链表中，然后循环这个链表，执行下面操作来合并多个 setState 参数。

```jsx
/**
 * preState: 前一个setState函数
 * nextProps: 后一个setState函数
 */
Object.assign({}, preState, nextProps)
```

如此一来，当多个 setState 连续，且传入的对象的属性是一样的时候，只会执行最后一个 setState 中的改变。
那么有没有一种办法不让连续的多个 setState 函数合并呢？当然是有的。之前提到过，setState 函数的第一个参数也可以是一个函数，这个函数接收两个参数，第一个是 state，表示上一次的状态；第二个参数是 props。
::: tip
当 setState 传入的是一个函数时，react 内部就会依次执行每一个 setState 函数了
:::
所以上面的代码可以这样改写，使界面数字变为 3。

```jsx
increment () {
    this.setState((state, props) => ({ count: state.count + 1 }))
    this.setState((state, props) => ({ count: state.count + 2 }))
  }
```

## 生命周期

<h4 id="1">首先来看下 React 官方给出的生命周期图谱</h4>

![life_cycle](./image/react/life_cycle.png)

图谱指出，一个组件大体会经历三个阶段：挂载阶段(Mounting)、更新阶段(Updating)、卸载阶段(Unmounting)。
生命周期中的函数称为生命周期函数或生命周期钩子，在 React 的生命周期中，有几个生命周期函数是值得注意的。
**1.constructor：** 初始化状态。

**2.componentDidMount：** 组件挂载后立即调用。通常在该函数中执行某些依赖 DOM 的操作，比如网络请求或者添加一些订阅。

**3.componentDidUpdate:** 在组件的 props 或者 state 更新后立即调用。

**4.componentWillUnmount:** 在组件卸载及销毁之前调用。一般用于执行一些清理操作，比如清除订阅。
