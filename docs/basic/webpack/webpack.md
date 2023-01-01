---
title: webpack
data: 2023-01-01 16:15:00
tags:
  - webpack
categories:
  - webpack
---

## webpack 简介

官方对 webpack 的解释为：webpack 是一个静态的模块化打包工具。

由于浏览器只支持 ES Module 一种模块化方式，并不支持 CommonJs、AMD 等其他模块化开发，而 webpack 默认支持多种模块化开发，并且可以将模块化语法转化成浏览器能够理解的 JavaScript 代码。在打包构建过程中，webpack 会分析各个文件间的依赖关系，然后生成一个依赖图并以文件的方式保存下来，将来浏览器在运行代码时就可以读取这个文件，并得到各模块之间的引用关系。

![webpack](./img/webpack.png)

那么，我们为什么需要使用 webpack？

- webpack 可以帮助我们开发时调用后端接口的跨域问题
- webpack 可以帮助我们在改动源代码后自动将变动更新至浏览器
- 由于 js 和 css 的兼容性问题，浏览器并不支持那些新特性，webpack 可以将其转换成浏览器识别的对应的特性

## webpack 初体验

### 安装

使用 webpack 需要安装两个工具：webpack、webpack-cli

```js
npm i webpack webpack-cli -D
```

为什么 webpack 需要安装两个包呢？它们之间的关系又是怎样的呢？

解答这个问题我们首先需要了解 webpack 的打包流程：当我们在命令行输入 webpack 或者利用各类框架的脚手架执行 webpack 命令时，首先会执行`node_modules/bin/webpack`文件中的代码，而 webpack 在执行核心打包代码之前，需要解析传入的参数以及配置文件内部的配置项，而解析参数和配置项的任务就是由`webpack-cli`来完成的。比如在命令行中输入`webpack --config w.config.js`，后面的参数就是由`webpack-cli`负责解析的。`webpack-cli`在完成参数的解析后会调用`webpack`中的核心代码进行编译和打包。

了解了 webpack 的打包流程，我们就自然而然的明白了为什么我们使用 webpack 需要安装两个包，以及这两个包的分工是如何的。从 webpack 打包流程我们可以知道，webpack-cli 的作用无非就是解析参数和配置文件描述的配置项。事实上，我们也可以自己编写一个类似于 webpack-cli 的工具来替代它解析参数和配置项，这样，我们就完全可以不用安装 webpack-cli 了。许多第三方脚手架内部就并没有依赖 webpack-cli，比如 Vue 使用的就是自己生态内部的一个叫 vue-service-cli 的工具。

### 使用

有两种方式运行 webpack：

1、直接在终端输入以下命令：

```js
npx webpack
```

当在命令行输入`webpack`时，webpack 默认会将当前目录下的`src/index.js`文件作为入口文件去寻找依赖并构建依赖图进行编译打包，如果当前目录下找不到`src/index.js`文件，则会抛出如下错误：

![no_found_error](./img/no_found_error.png)

当然，我们也可以增加参数更换入口文件：

```js
npx webpack --entry ./src/main.js
```

执行上面的命令，那么 webpack 就会把`./src/main.js`当作入口文件了，更多参数，可以查阅[webpack 官方文档](https://webpack.docschina.org/api/cli/#configtest)。

webpack 打包后默认会在根目录下输出一个`dist/main.js`文件，里面的代码默认都是经过压缩和丑化的。

2、通过脚本执行
我们也可以在`package.json`文件中对打包命令进行自定义

```json
//package.json

{
  "scripts": {
    "build": "webpack"
  }
}
```

当然我们也可以在后面添加参数：

```json
//package.json

{
  "scripts": {
    "build": "webpack --entry ./src/main.js"
  }
}
```

如此一来，我们就可以直接在命令行内输入以下命令运行 webpack：

```js
npm run build
```

### 配置文件

前面有介绍，我们可以通过在命令行或者`package.json`文件的脚本中，向 webpack 传递参数。但是当我们有许多参数需要传递给 webpack，比如，我们需要传递入口路径、出口路径、各种 loader 和 plugin 等等，这个时候，如果依旧采用这种方法传递参数，显示是非常冗余且不灵活的。

此时我们就可以采用配置文件的方式传递参数。webpack
