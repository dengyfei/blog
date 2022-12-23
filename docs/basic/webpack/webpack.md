---
title: webpack
data: 2022-12-19 20:30:00
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
