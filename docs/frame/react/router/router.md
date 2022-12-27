---
title: React Router v5
date: 2022-12-24 17:18:00
tags:
  - react
  - react router
categories:
  - react
  - react router
---

## 前端路由

以前的路由都是由后端完成，我们称为后端路由。具体流程就是服务器收到客户端发送的 http 请求后，就会根据这个请求的 url 执行映射函数，然后返回映射函数的值，而这个 url 的映射函数其实就是一个文件的读取操作，比如浏览器向服务器发送获取 index.html 的请求，服务器收到请求后会执行映射函数，实际上就是寻找到 index.html 当中包含的资源，并将 html 渲染好之后返回给浏览器，浏览器则直接展示。这种后端路由的方式，几乎所有事情都是服务器完成，浏览器只负责展示。

### 单页面应用(SPA)

单页面应用指的就是第一次进入到页面的时候浏览器会请求一个 html 文件，当切换的其他组件时，虽然 url 发生了对应的改变，但是浏览器并未给服务器发送请求。而是由 Javascript 感知到 url 发生变化后，由前端动态的清理当前页面内容，并将下一个页面的内容渲染到浏览器，这个过程就是单页面应用(single page application, SPA)。

### 前端路由的原理

随着前端技术和单页面应用的发展，现在页面的路由，包括 Angular、Vue 和 React 三大框架的路由都是由前端完成，称为前端路由。前端路由本质就是浏览器在不向服务端发送请求的情况下，由前端完成修改 url、检测 url 的变化，通过解析、匹配路由规则从而实现 UI 界面的更新。

前端路由主要有两种实现方式：hash 模式和 history 模式。

#### hash 模式原理

url 中 hash 值只是客户端的一种状态，也就是说当向服务端发送请求时，hash 部分不会被发送。我们可以通过监听 hashChange 事件来监听 url 中 hash 值的变化，然后触发回调函数，改变相应的组件。
:::tip
触发 hash 变化的两种方式：

- a 标签的 href 属性
- 对 location.hash 赋值
  :::

```html
<!-- 触发hashChange事件的两种方式 -->

<a href="#search">search</a>

location.hash = '#search'
```

#### history 模式原理

history 模式利用了 html5 中`history.pushState`和`history.replaceState`两个 api 可以在不刷新页面的情况下，操作浏览器的历史纪录，然后通过监听 popState 事件来监听 url 变化。
:::tip
值得注意的是，仅仅调用`pushState`方法或`replaceState`方法并不会触发 popState 事件，只有用户点击浏览器倒退或前进按钮，或者使用 Javascript 调用 back、forward、go 方法时才会触发。
:::

## react-router v5

react-router 是完整的 react 的路由解决方案，它保持 UI 与 URL 的同步。目前使用的最多的是 v5.x 和 v6.x 两个版本，且两个版本的 API 发生了比较大的变动，本文主要介绍 v5.x 版本的使用。

### 组件

**BrowserRouter 或 HashRouter：** Router 中包含了对路径改变的监听，并且会将相应的路径传递给子组件。

:::tip
BrowserRouter 使用的是 history 模式；HashRouter 使用的是 hash 模式。
:::

BrowserRouter 的问题：当我们将 React 项目部署到服务器时，如果直接访问根目录，请求 index.html 的请求会直接发送给服务端，这个页面服务器根目录下是有的，所以此时不会有任何问题。用户访问页面后，点击页面上的链接切换到不同组件也是没问题的，因为此时页面并没有发生跳转，而是通过 react router 在内存中完成了模拟跳转，所以也没问题。但是，当我们手动刷新页面，或者直接通过浏览器地址栏访问某个路由(如：localhost:3000/about)进行跳转时，则会向服务端发送请求加载数据，服务端会寻找名为 about 的资源，但由于服务器根目录下只存在 index.html(单页面应用)，不存在 about.html 文件，所以就会返回 404。

解决方案：

- 方案一： 使用 HashRouter。浏览器发送请求的时候是不会携带 hash 值的，比如我们访问`localhost:3000/#/about`，浏览器发送的请求依旧是：`localhost:3000/`，即，依旧是请求 index.html 文件，然后使用 React Router 处理分发，因此不会出问题。

- 方案二：修改服务器配置，将所有请求都转发到 index.html，这样所有的请求就都交给了 React 处理。

以 Nginx 为例，进行如下操作：

```js
// conf/nginx.config

location / {
  root html;
  #index index.html index.htm;
  try_files $uri /index.html;
}
```

重新加载 nginx 服务

```js
.\nginx.exe -s reload
```

**Link：** 通常路径跳转使用的是 Link 组件，**该组件最终会被渲染成 a 标签**，但是不会向服务器发送请求。Link 组件中最重要的属性是`to属性`，用于设置跳转到的路径。

**Route：** 当 Route 的路径被访问时，对应的组件就会自动挂载，默认情况下 Route 并不是精确匹配，而是模糊匹配。

- path 属性：用于设置匹配到的路径
- exact 属性：精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件，默认为 false，即，模糊匹配。
- component 属性：设置匹配到路径后，渲染的组件。注意，component 中不能写 jsx 语法，直接传递组件的类即可。通过 component 构建的组件，React 会自动创建并且传递参数。

:::tip
React 会主动向 component 中传递三个参数，可以在组件中通过 props 获取。

- match：路径匹配信息。包括请求参数、匹配到的 url 地址等等
- location：地址信息
- history：控制页面跳转
  :::

## 使用

```js
yarn add react-router-dom
```

```jsx
// index.js

import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './app'

const root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

```jsx
//app.jsx

import React, { PureComponent } from 'react'
import { Link, Route } from 'react-router-dom'

import Home from './home'
import About from '/about'

export default class app extends PureComponent {
  render() {
    return (
      <div>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </div>
    )
  }
}
```

### NavLink

假设现在有一个需求：当某个路径被选中时，对应的 a 标签显示成红色。

对于上面的需求，我们可以使用 NavLink 来完成。NavLink 是在 Link 的基础上增加了一些样式属性，具体增加如下：

- activeStyle：匹配时的样式
- activeClassName：匹配时添加的 class
- exact：是否精确匹配

我们可以使用 NavLink 组件对选中的组件设置样式。

事实上，NavLink 在匹配成功时默认会被动态添加一个 active 类名，所以我们可以直接编写样式。当然，如果你担心这个类名在其他地方被使用了，出现样式重叠问题，我们也可以自定义类名：

```jsx
<NavLink to="/" activeClassName="link-active"> 首页</NavLink>
<NavLink to="/about" activeClassName="link-active">关于</NavLink>
```

### Route 的其他属性

#### render

前面讲了 Route 组件的一个 component 属性，是指定要挂载的组件，但是这个组件是由 react 来指定并传参的，也就是说，我们是无法向这个组件传递参数的。

而 render 属性的作用也是指定要挂载的组件，它要求传入一个回调函数，该函数的返回值最终会被挂载，render 属性不是 react 主动创建并挂载的，因此不会传递 match、history 和 location 参数。不过 render 传递回调函数会默认自带一个参数：routeProps，该参数就是这三个参数的一个对象。

```jsx
import React, { PureComponent } from 'react'
import {Link, Route } from 'react-router-dom'

import Home from './home'
export default class App extends PureComponent {
  render () {
    return (
      <div>
          <Link to='/'>首页</Link>
          <Route exact path='/' render((routeProps) => <Home {...routeProps} name='code' />) />
      </div>
    )
  }
}
```

:::tip
由于 render 允许向将挂载的组件中传递参数，因此 render 相对于 component 更灵活
:::

#### children

children 也是用来指定被挂载的组件，用法有两种：
1、和 render 相似，传递的是回调函数，只不过当传递的是一个函数时，该组件无论路径是否匹配，都会被挂载(就很鸡肋)

2、传递一个组件，需要是 jsx 写法

```jsx
<Route exact path="/" children={<Home />} />
```

## 钩子函数

react-router 其实为我们提供了几个钩子函数以便我们可以在组件中方便的获取 match、location 和 history

但是由于这几个钩子函数都是 hooks 钩子，而 hooks 钩子只能在函数式组件中调用，因此，我们需要把组件改写成函数式组件才能使用这几个钩子函数

```jsx
import React, { PureComponent } from 'react'
import {
  useRouteMatch,
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom'

export default function Home() {
  const match = useRouteMatch()
  const location = useLocation()
  const params = useParams()
  const history = useHistory()
  return <div>Home</div>
}
```

:::warning
函数式组件可以通过钩子函数和 props 获取三个参数，而类组件只能通过 props 获取
:::

## Switch 组件

我们来看下面的路由规则：

```jsx
  <Route exact path="/" component={Home} />
  <Route exact path="/about" component={About} />
  <Route exact path="/:userid" component={Detail} />
  <Route exact component={Login} />
```

我们可以发现，上面的路由当我们匹配到某一个路径时，会有一些问题。比如当我们匹配到`/about`时，动态路由`/:userid`也能被匹配到，而且最后一个路径会一直被匹配到。

原因在于，默认情况下，react-router 中只要某个 Route 的路径被匹配到，对应的组件就会被渲染，当我们想要匹配`/about`路径时，我们会发现动态路由`/:userid`和最后一个没有路由的 Route 都会被匹配，因此都会渲染

但是实际开发中，我们往往希望的得到的是一种排他思想：只要匹配到了一个，后面就不要继续匹配了。

这个时候，我们就可以使用 Switch 组件包裹将所有的 Route，Switch 组件提供了一种排他行为，即，匹配到一个路由后就停止匹配。

```jsx
<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/about" exact component={About} />
  <Route path="/:userid" exact component={Detail} />
  <Route exact component={Login} />
</Switch>
```

## Redirect 组件

Redirect 组件用于路由重定向，当这个组件出现时，就会跳转到对应的 to 路径中。

这里使用一个案件说明：
用户跳转到 User 界面，但是 User 界面有一个 isLogin 的判断，用于记录用户是否登录。为 true，那么显示用户名；为 false，直接重定向到登录界面

```jsx
import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'

export default class home extends PureComponent {
  constructor() {
    super()
    this.state = {
      isLogin: true,
    }
  }
  render() {
    const { isLogin } = this.state
    return isLogin ? (
      <div>
        <h2>User</h2>
        <h2>用户名：tom</h2>
      </div>
    ) : (
      <Redirect to="/login" />
    )
  }
}
```

## 手动路由跳转

目前，我们实现的跳转主要是通过 Link 或者 NavLink 进行跳转的，而 Link 和 NavLink 最终都是被渲染成 a 标签，如果我们想要实现其他标签的跳转，比如点击按钮跳转，那么我们就只能通过 JavaScript 代码进行跳转。但是通过 JavaScript 代码进行跳转的前提就是：**必须获取到 history 对象**

如何可以获取到 history 的对象呢？有两种方式：

- 方式一：如果该组件是通过 Route 直接跳转过来的，那么可以直接获取 history、location、match 对象

```jsx
//app.jsx

import React, { PureComponent } from 'react'
import { NavLink, Route } from 'react-router-dom'

import About from './about'

export default class app extends PureComponent {
  render() {
    return (
      <div>
        <NavLink to="/about">关于</NavLink>
        {/*about组件是由Route渲染的*/}
        <Route path="/about" component={About} />
      </div>
    )
  }
}
```

```jsx
//about.jsx

import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import Join from './join'

export default class about extends PureComponent {
  render() {
    return (
      <div>
        <button onClick={(e) => this.join()}>加入我们</button>
        <Route path="/about/join" component={Join} />
      </div>
    )
  }
  join() {
    this.props.history.push({
      pathname: '/about/join',
      state: { name: 'hahaha' }, //这个参数会被传递到join组件的location.state当中
    })
  }
}
```

- 方式二：如果是一个普通渲染的组件，那么不可以直接获取 history 等对象，这时，可以通过 withRouter 这个高阶组件来实现。

前面介绍过，只有当一个组件是通过 Route 渲染的，React 才会主动向 component 对应的组件中传入 history、location、match 参数，而对于普通渲染的组件，我们可以通过 withRouter 这个高阶组件来向组件内部传入这三个参数。

```jsx
//index.js

import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app'

const root = createRoot(document.getElementById('root'))

root.render(
  {/*app组件只是普通渲染，没有通过Route组件渲染*/}
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

```jsx
import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import About from './about'

class app extends PureComponent {
  render() {
    return (
      <div>
        <button onClick={(e) => this.jumpAbout()}>关于</button>
        <Route path="/about" component={About} />
      </div>
    )
  }
  jumpAbout() {
    this.props.history.push('/about')
  }
}

export default withRouter(app)
```

## 参数传递

前面有介绍过，当我们使用 Route 组件的 component 属性渲染组件时，React 会主动传递 match、history 和 location 三个参数到组件内部；如果我们还想传递其他参数的话，我们可以使用 Route 组件的 render 属性来渲染组件。

其实，我们也可以通过给 Link 或者 NavLink 传递一个对象的方式给组件传递参数

```jsx
//app.jsx

import React, { PureComponent } from 'react'
import { Link, Route } from 'react-router-dom'

import Home from './home'

export default class app extends PureComponent {
  constructor() {
    super()
    this.state = {
      info: { name: 'xiaodeng', age: 24 },
    }
  }
  render() {
    return (
      <div>
        <Link to={{ path: '/', state: this.state.info }}>首页</Link>
        <Route path="/" component={Home} />
      </div>
    )
  }
}
```

## react-router-config

前面我们所有的路由定义都是在 app 组件中直接使用 Route 组件，并且添加属性完成的。当一个项目需要渲染大量组件时，这种方式会让路由变得非常混乱，并且后期也不利于维护。在 Vue.js 中会有一个 vue-router 的组件专门管理路由，而 react 中同样需要使用另一个库来完成对路由的统一管理，这就是**react-router-config**

```js
yarn add react-router-config
```

我们可以在项目根目录下新建一个`route/index.js`文件，用来统一管理路由

```js
import Home from '../home'
import About from '../about'
import Login from '../login'
import Detail from '../detail'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/about',
    component: About,

    // 子路由
    routes: [
      {
        path: '/about',
        exact: true,
        component: Detail,
      },
      {
        path: '/about/detail',
        component: Detail,
      },
      {
        path: '/about/login',
        component: Login,
      },
    ],
  },
]

export default routes
```

```jsx
//app.js

import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

import { renderRoutes } from 'react-router-config'
import routes from './router'

export default class app extends PureComponent {
  render() {
    return (
      <div>
        <NavLink to="/">首页</NavLink>
        <NavLink to="/about">关于</NavLink>

        {/* 使用renderRoutes函数来生成Router组件 */}
        {renderRoutes(routes)}
      </div>
    )
  }
}
```

```jsx
//about.js

import React, { PureComponent } from 'react'

import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'

export default class about extends PureComponent {
  render() {
    return (
      <div>
        <NavLink to="/about/detail">详情</NavLink>
        <NavLink to="/about/login">登录</NavLink>

        {/*只有组件本身是通过renderRoute函数生成的，props上才会有route属性*/}
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}
```
