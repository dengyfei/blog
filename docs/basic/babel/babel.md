---
title: babel
date: 2023-02-27 22:17:39
tags:
  - babel
categories:
  - babel
---

## 简介

随着前端的技术的日益发展，ECMAScript 语法为了满足现代前端需要，几乎每年都会推出一个新的版本，从最开始的 ES3、ES5 到现在的 ES6、ES2020、ES2021、ES2022 等等，每个版本的推出都必不可少的新增一些新的特性。而浏览器对这些新特性的支持速度与其更新速度并不同步，这就造成了许多低版本浏览器对一些新特性并不支持。我们可以在[caniuse](https://caniuse.com/)网站中查找到支持某个新特性的各个版本浏览器。比如在`caniuse`搜索`promise.allSettled`，如下图，可以发现每个浏览器的低版本都不支持该特性：

![caniuse.png](./img/caniuse.png)

而 Babel 是一个工具链，主要就是用于将 ES6 中的新特性转换为 ES5 等向后兼容的低版本 JavaScript 特性，以适应对应低版本的浏览器。包括：语法转换、源代码转换、polyfill 等。

:::danger
babel 只会针对`.browserslistrc`文件中所定义的浏览器进行适配
<a href="../webpack/webpack.html">点我</a>
:::
