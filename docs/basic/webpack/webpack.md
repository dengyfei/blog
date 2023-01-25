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

## 配置文件

前面有介绍，我们可以通过在命令行或者`package.json`文件的脚本中，向 webpack 传递参数。但是当我们有许多参数需要传递给 webpack，比如，我们需要传递入口路径、出口路径、各种 loader 和 plugin 等等，这个时候，如果依旧采用这种方法传递参数，显示是非常冗余且不灵活的。

此时我们就可以采用配置文件的方式传递参数。webpack 在执行时，默认会寻找根目录下一个名为`webpack.config.js`的文件并解析文件内部的配置项。因此，我们可以在根目录下创建一个`webpack.config.js`文件，并传入配置项。
:::tip
当执行 webpack 命令时，webpack 会通过 commonjs 的方式读取这个配置，因此，在配置文件中，我们也需要通过 commonjs 的方式导出一个对象
:::

### 上下文 context

context 的配置必须使用绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)。即，entry 和 loader 配置中的相对路径都是相对于 context 配置而言的。

Webpack 设置 context 默认值源码为:

```js
this.set('context', process.cwd())
```

process.cwd()获取的是 webpack 的运行目录(等同于 package.json 所在路径)。

我们可以通过配置项改变 context 的值：

```js
module.exports = {
  context: path.resolve(__dirname, 'app'),
}
```

当然也可以通过在 package.json 中传递参数更改：

```js
{
  "build": "webpack --context ./app"
}
```

### 入口及出口配置

```js
//webpack.config.js

//引入path
const path = require('path')

module.exports = {
  //配置入口
  entry: './src/main.js',

  // 配置出口
  output: {
    // 打包后的文件名
    filename: 'build.js',
    // 打包后的路径，需要写绝对路径
    path: path.resolve(__dirname, './bundle'),
  },
}
```

entry：指定入口文件，相对路径。
:::danger
entry 要求传入的是一个相对路径，并不是相对文件所在的路径，而是相对 context 配置的路径，context 属性默认使用的是当前根目录。
:::

output：指定出口文件

- filename：打包后输出的文件名
- path：打包后文件的输出目录，要求传入一个绝对路径
- publicPath：该属性是指定 index.html 文件打包引用的一个基本路径

:::danger
output 中的 publicPath 属性应该写以根目录方式表示的路径(如：/dist/)，或者绝对路径，不应该是相对路径
:::

```js
//webpack.config.js

const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './bundle'),

    // 此处并不是相当路径
    publicPath: '/dist/',
  },
}
```

:::warning
在生产环境下，当使用 webpack 打包构建时，会在 index.html 引入静态资源路径前面加上 publicPath 的值。

在开发环境下，使用 webpack-dev-server 进行开发时，它并不会在 index.html 的引入静态资源的路径前拼接 publicPath 的值。相反，它指的是 webpack-dev-server 在进行打包时生成的静态文件所在的位置，默认时 webpack-dev-server 服务器的根目录下。

总而言之，publicPath 在不同环境下，有不同的含义
:::

生产环境下，在我们打包后的 index.html 文件中，它会通过 script 标签的 src 属性来引入打包后的静态资源，比如 js、css 文件等等，具体如下图：

![script](./img/script.png)

src 里面的这个路径其实是由`output配置`中的`publicPath + 资源路径`构成的。由于 publicPath 的默认值是一个空字符串，所以我们打包后引入 js 文件时，路径是 build.js。在开发中，我们也经常会将其设置为`/`，此时路径是一个相对路径`./build.js`，那么浏览器会根据所在域名+路径去请求对应的资源。**开发环境下，一般我们直接使用默认值`/`。**

开发环境下具体使用见 webpack-dev-server 部分。

### 指定配置文件

默认情况下，webpack 只会把当前目录下`webpack.config.js`作为其配置文件，如果想要更改配置文件的路径或者文件名，可以在`package.json`中传入参数

```json
//package.json

{
  "script": {
    // 将wk.config.js文件作为webpack配置文件
    "build": "webpack --config ./wk.config.js"
  }
}
```

## Loader

webpack 只能解析 js 和 json 文件，对于其他文件，webpack 是无法识别和解析的。这个时候，我们就需要通过各种各样的 loader 来帮助我们解析其他的文件。

loader 可以用于对模块源代码的转换，**loader 的本质是一个函数，** 它的作用就是将匹配到的源文件内容进行处理然后输出。当某个规则使用了多个 loader 处理时，就会按照从下往上的顺序依次执行，后一个 loader 拿到的都是前一个 loader 处理完成的内容，可以理解为链式调用。所以开发 loader 时，最要关心的就是它的输入和输出。

### css-loader

我们可以将 css 文件看成一个模块，然后通过 import 或@import 来读取这个模块。但是在加载这个模块时，webpack 并不知道如何引入 css 模块，所以我们必须使用 loader 来帮助我们完成对 css 文件的引入。

对于加载 css 文件来说，我们需要一个可以读取 css 文件的 loader，最常用的就是 css-loader。css-loader 的作用就是完成对 css 文件的读取引入，除此之外，css-loader 不会对引入的 css 文件做任何操作。当然 css 文件中@import 引入另一个 css 文件的操作也是由 css-loader 来完成。

**安装**

```js
npm install css-loader -D
```

**使用方式**

有两种方式使用 css-loader：

- 方式一：**内联方式。** 在引入的样式前加上使用的 loader，并且使用`!`分割，内联样式由于不方便管理，所以使用的较少

```js
import 'css-loader!../css/style.css'
```

- 方式二：**配置文件方式。** 在`webpack.config.js`中 module 属性下面的 rules 数组中配置 loader 使用的规则。

module.rules 的配置如下：

rules 属性对应的值是一个数组： [Rule]

数组中存放的是一个个的 Rule，Rule 是一个对象，对象中可以设置多个属性：

- test 属性：用于对 resource(资源)进行匹配的，通常设置成正则表达式；
- use 属性：对应的值是一个数组：[UseEntry]，UseEntry 是一个对象，可以通过对象的属性来设置一些其他属性：

  1、loader：必须有一个 loader 属性，对应的值是一个字符串

  2、options：可选的属性，值是一个字符串或者对象，值会被传入到 loader 中

UseEntry 也可以简写成一个字符串(如：use:['style-loader'])，它其实式 loader 属性的简写方式(如：use:[{ loader: 'style-loader' }])

- loader 属性：Rule.use:[{loader}]的简写

```js
const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader: 'css-loader',           //写法一
        // use: ['css-loader'],            //写法二

        // 写法三
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
}
```

- importLoaders 属性

importLoaders 属性的作用在于当 css-loader 解析到@import 命令时，能够把引入的 css 文件重新交回到前面的 loader 解析。它的值是一个整数，默认是 0。

这样解释可能有些抽象，直接上案例，有以下代码：

```js
// webpack.config.js

module.export = {
  ……
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1             //将css文件中引入的其他css文件重新交回到前面1个loader解析，即postcss-loader。
            }
          },
          'postcss-loader']
      }
    ]
  }
}
```

### style-loader

前面有讲到 css-loader 的唯一作用就是解析`import`和`@import`语句，并不会将解析之后的 css 插入到页面中。因此，对于 css 文件，如果仅仅使用 css-loader 来编译的话，最终是无法在页面上看到效果的。如果我们希望再完成插入 style 的操作，那么我们还需要另外一个 loader，就是 style-loader。

style-loader 的作用是将 css-loader 解析后的 css 文件插入到页面中，具体是通过 head 标签中插入 style 标签实现的。

**安装**

```js
npm i style-loader -D
```

**配置**

在配置文件中，添加 style-loader。

:::tip
注意：因为 loader 的执行顺序是从右向左(或者说从下到上，从后到前)，所以我们需要将 style-loader 写到 css-loader 的前面。
:::

```js
module.exports = {
  ……
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

![css](./img/css.png)

### less-loader

如果我们编写的是 less 文件，首先我们需要将 less 文件转化成 css 文件，这个过程是 less 包来完成的。

less-loader 首先会通过 less 包将 less 文件转成 css 文件，然后按照之前的步骤进行编译和打包

**安装**

```js
npm i less less-loader -D
```

**配置**

```js
module.export = {
  ……
  module: {
    rules: [
      {
        test: '/\.less$/',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

### file-loader

要处理 jpg、png 等格式的图片，我们也需要有对应的 loader：file-loader。file-loader 的作用就是帮助我们处理`import/require`方式引入的一个文件资源，并且将它放到我们输出的文件夹中。

**安装**

```js
npm i file-loader -D
```

**配置**

```js
// index.js

const img = document.createElement('img')

// 通过require引入文件
img.src = require('./assets/img/icon.jpg').default
document.body.appendChild(img)
```

```js
{
  test: /\.(png | jpe?g | gif | svg)$/i,
  use: {
    loader: 'file-loader'
  }
}
```

如此配置后，打包出来的文件如下：

<div style="text-align: center">
<img src="./img/img.png" />
</div>

可以看见，打包后输出的文件名是一串 32 位的 hash 值，这样我们就无法将文件和源文件很好的对应起来。再者，当有许多图片需要打包时，所有的图片都放到根目录下，就会造成根目录过于冗余。为了解决这个问题，我们可以将 file-loader 配置成如下形式：

```js
{
  test: /\.(png | jpe?g | gif | svg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[placeholder]'         //将图片打包到img文件夹下，并重新命名
      }
    }
  ]
}
```

- [ext]：输出文件的扩展名
- [name]：输出文件的名称
- [hash]：文件的 hash 值。使用 MD4 的散列函数处理，生成的一个 128 位的 hash 值(32 位十六进制)
- [contentHash]：在 file-loader 中和[hash]的结果是一致的
- [hash:length]：截取部分 hash 值，32 个字符太长了
- [path]：文件相对于 webpack 配置文件的路径

具体配置如下：

```js
{
  test: /\.(png | jpe?g | gif | svg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash:6].[ext]'
      }
    }
  ]
}
```

最终打包结果入下：

<div style="text-align: center">
<img src="./img/img.png" style="width: 100%" />
</div>

### url-loader

使用 file-loader 打包后的图片会生成另外一个文件，也就是说，当浏览器运行时，它需要再次发起一个 http 请求，去请求这张图片。这样的话，当一个项目中有许多张图片时，就需要发送大量的网络请求，这显然不符合开发需求。

url-loader 和 file-loader 的作用是相似的。它可以将文件转成 base64 的 URI，并且直接嵌入到打包后的 js 文件中，不过这样虽然能够减少网络请求，却也增加了 js 的大小，使得 js 的下载需要花费更长的时间。

因此，在项目中，一般小图片使用 url-loader 处理，而大文件则使用 file-loader 处理。

```js
{
  test: /\.(png | jpe?g | gif | svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: 'img/[name].[hash:6].[ext]',
        limit: 100 * 1024         //100kb以下使用url-loader处理
      }
    }
  ]
}
```

如果文件大于该阈值，会自动的交给 file-loader 处理，因此，无需另外配置 file-loader。

### vue-loader

**安装**

```js
// vue-template-compiler的作用是帮助我们解析template标签

npm install vue-loader vue@2 vue-template-compiler -D
```

**配置**

```js
// index.js

import App from './app.vue'
import Vue from 'vue'

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

```js
// webpack.config.js

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  ……
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
}
```

### 自定义 loader

loader 本质上是导出一个函数的 JavaScript 模块，webpack 在解析过程中，loader runner 库会调用这个函数，然后将上一个 loader 产生的结果或资源文件传入进去。

**自定义 Loader 过程：**

1、新建一个 loaders 文件夹，并在文件夹下新建 my-loader.js 文件。

my-loader.js 模块导出一个函数，该函数接收三个参数：

- content：资源文件的内容

- map：sourcemap 相关的数据

- meta：一些元数据

这个函数必须有返回值，且返回值必须是一个字符串或者 buffer

```js
module.exports = function (content) {
  console.log(content)
  return content
}
```

2、webpack.config.js 文件中使用。

```js
module.export = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: './loaders/my-loader.js', //使用的是相当路径，相对于前面介绍的context路径
      },
    ],
  },
}
```

我们在自定义中暴露出来的这个函数称为：NormalLoader，其实 loader 中还存在另外一个函数，称为：PitchLoader。

```js
// NormalLoader
module.exports = function (content) {
  console.log(content)
  return content
}

// PitchLoader
module.exports.pitch = function () {
  console.log('pitch loader')
}
```

前面我们介绍过，Loader 的执行顺序是从后往前的，这其实指的是 NormalLoader 的执行顺序，而 PitchLoader 的执行顺序是从前往后的，并且 PitchLoader 会先于 NormalLoader 执行。

原因在于 loader runner 在执行 loader 时，会维护一个 loaderIndex 的变量，就是 loader 数组的下标。在 Pitching 阶段，会挨个执行 PitchLoader 函数，它会执行 loaderIndex++，直至最后一个，执行完 PitchLoader 后，进入到 Normal 阶段，他又会执行 loaderIndex-- 的操作，然后一个个执行 NormalLoader。

### 向自定义 loader 中传入参数

前面介绍过，loader 的本质就是导出一个函数的模块，既然是这样，那么我们是不是可以向这个函数内部传入参数呢？当然也是可以的。

```js
module.exports = {
  ……
  rules: [
    {
      test: /\.js$/,
      loader: './loaders/my_loader.js',
      options: {
        name: 'xiaodeng',
        age: 27
      }
    }
  ]
}
```

```js
module.exports = function (content) {
  // 获取参数
  const options = this.getOptions()
  console.log(options)
  return content
}
```

除此之外，我们还可以对传入函数的参数进行校验，这里我们需要借助 webpack 官方给我们提供的一个校验库：schema-utils

1、安装

```js
npm i schema-utils -D
```

2、新建一个 schema.json 文件

```json
{
  "type": "object", //参数类型
  "properties": {
    "name": {
      "type": "string", //name字段类型
      "description": "请输入姓名" //报错时的提示
    },
    "age": {
      "type": "number",
      "description": "请输入年龄"
    }
  }
}
```

2、在导出函数中进行参数校验

```js
const { validate } = require('schema-utils')
const loaderSchema = require('../schema.json')

module.exports = function (content) {
  const options = this.getOptions()
  validate(loaderSchema, options)
  return content
}
```

### 同步 loader 和异步 loader

**同步 loader：**

默认创建的 loader 都是同步的 loader，这个 loader 必须通过 return 或者 this.callback 将返回结果交给下一个 loader 来处理。通常在有错误的情况下，我们会使用 this.callback 返回。this.callback 接受：第一个参数必须是 Error 或者 null，第二个参数是一个 string 或 buffer。

```js
module.exports = function (content) {
  this.callback(null, content)
}
```

**异步 loader：**

有时候我们使用 loader 时会进行一些耗时的异步操作，我们希望在异步操作完成后，再返回这个 loader 处理的结果，这个时候，我们就需要使用异步的 loader 了。方法很简单，只需调用一下 this.async 方法就可以了，这个方法会返回一个 callback。

```js
module.exports = function (content) {
  const callback = this.async()
  setTimeout(() => {
    console.log(content)
    callback(null, content)
  }, 1000)
}
```

### enforce 属性

虽然说 loader 的默认执行顺序是从后往前的，但是我们也可以更改 loader 的执行顺序。我们可以拆分成多个 rule，然后通过 enforce 来决定它们执行的顺序。

enforce 有四个值可选：normal(默认)、inline(行内)、pre、post

:::tip
执行顺序：

pitching 阶段： post、inline、normal、pre

normal 阶段：pre、normal、inline、post
:::

```js
module.export = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'loader1',
      },
      {
        test: /\.js$/,
        loader: 'loader2',
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        loader: 'loader3',
      },
    ],
  },
}
//执行顺序 loader2 --> loader3 --> loader1
```

### resolveLoader 属性

resolveLoader 属性其实是 resolve 属性的一个简化版，只不过这个简化版只适用于 loader 的配置。

我们在使用自定义 loader 时，传入的是一个相对路径，当我们有很多自定义 loader 时，每一个都要写很长的一段路径，这样就过于冗余了。resolveLoader 就可以帮我们直接去加载自己的 loaders 文件夹。

```js
module.export = {
  resolveLoader: {
    modules: ['node_modules', 'loaders'], //先去node_modules中找，找不到了就去loaders文件夹下找
  },
}
```

经过 resolveLoader 属性配置后，前面自定义 loader 就可以用以下方式引入：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'my_loader',
      },
    ],
  },
}
```

## asset modules

在 webpack5 之前，加载某些资源我们需要使用一些 loader，比如 raw-loader 、url-loader、file-loader； 而在 webpack5 之后，我们可以直接使用资源模块类型（asset module type），来替代上面的这些 loader。

资源模块类型(asset module type)通过添加 4 种新的模块类型，来替换所有这些 loader：

**asset/resource：** 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现；

**asset/inline：** 导出一个资源的 data URI。之前通过使用 url-loader 实现；

**asset/source：** 导出资源的源代码，前通过使用 raw-loader 实现。

**asset：** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现，默认 8k 以下文件大小采用 asset/inline，8k 以上使用 asset/resource。

```js
const el = document.createElement('img')
el.src = require('./assets/img/icon.jpeg')
document.body.appendChild(el)
```

```js
//asset/resource
{
	test: /\.(png|jpe?g|gif|svg)$/,
    type: 'asset/resource',                      //选择资源类型模块
    generator: {
       filename: 'assets/img/[name].[hash:6][ext]'      //定义打包后图片放置的位置,注意此时[ext]包括了符号.
    }
}

//asset/inline
{
	test: /\.(png|jpe?g|gif|svg)$/,
    type: 'asset/inline',             //会把图片转成base64位嵌进去，因此不用generator来定义图片位置
}

//asset
{
	test: /\.(png|jpe?g|gif|svg)$/,
    type: 'asset',
    generator: {
       filename: 'assets/img/[name].[hash:6][ext]'
    },
    parser: {
        dataUrlCondition: {
            maxSize: 100 * 1024    //配置100k以下使用asset/inline，100k以上使用asset/resource
        }
    }
}
```

除了图片，其他的一些资源，比如字体文件，文本文件等都可以采用 asset modules type 的方式来处理。

```js
{
  test: /\.(ttf|eot|woff2?$)/i,
  type: 'asset/resource'         //字体文件一般是直接复制，不使用base64位
}，
{
  test: /\.txt/,
  type: 'asset/source'          //将文本转成字符串插入
}
```

## browserslist

在开发过程中，我们经常会碰到浏览器兼容性问题，比如有的浏览器兼容 ES6 语法，有的浏览器却不兼容；某些 css 特性，尤其是一些最新通过的 css 特性，也并不是所有浏览器都支持。因此为了保证用户在不同浏览器均可以访问我们写的代码，我们就需要通过各种工具来实现浏览器间的兼容性。比如 Autoprefixer 可以帮助我们给某些 css 特性自动添加前缀以实现浏览器兼容，babel 可以帮助我们实现 js 在浏览器间的兼容。但是我们并不知道什么时候要使用 Autoprefixer 和 babel 来转换我们的代码以适配对应浏览器，Browserslist 就是一个这样的工具，它提供需要在多个不同前端工具(Autoprefixer、babel 等)之间共享的配置，并且根据这些配置查询需要适配的浏览器。

由于 webpack 本身就依赖了 browserslist，所以当我们使用 webpack 构建项目时，无需重新下载安装，直接配置即可。

**配置：**

在根目录下新建一个`.browserslistrc`文件，并做如下配置：

```js
>1%                   //只兼容市场占有率超过1%的浏览器，去caniuse网站中寻找
last 2 version       //只兼容每个浏览器的最后2个版本
not dead            //只兼容24个月内官方依旧支持或更新的浏览器
```

当然，我们也可以在 package.json 当中新增一个 browserslist 属性来配置 browserslist：

```json
"browserslist": [
  ">1%",
  "last 2 version",
  "not dead"
]
```

我们配置的每一项，如`>1%`，称为查询条件，而多个条件的组合称为组合查询，那么组合查询中每个查询条件的关系是如何的呢？见下图：

<div style="text-align: center">
<img src="./img/query_combiner.png" />
</div>

## PostCSS

PostCSS 是一个通过 JavaScript 插件来转换样式的工具；这个工具可以帮助我们进行一些**CSS 的转换和适配**，换句话说 PostCSS 的功能就是处理 css 的兼容性问题。比如自动添加浏览器前缀、css 样式的重置；但是实现这些工具，我们需要借助于 PostCSS 对应的插件。
:::tip
PostCSS 是依据`.browserslistrc`文件中所限定的浏览器来适配的。
:::

PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查编写的 CSS， 编译那些尚未被对应浏览器所支持的先进 CSS 语法和特性、内联图片、以及其它很多优秀的功能。

**安装**

postcss-loader 是为了在 webpack 中使用 postcss，所以需要同时安装 postcss-loader 和 postcss

```js
npm i postcss-loader postcss -D
```

PostCSS 接收一个 CSS 文件并提供了一个 API 来分析、修改它的规则（通过把 CSS 规则转换成一个抽象语法树的方式）。在这之后，这个 API 便可被许多插件利用来做有用的事情。因此我们需要配置许多的 PostCSS 插件来帮助我们完成 CSS 适配，比如寻错或自动添加 CSS vendor 前缀。

但是针对不同的浏览器可能需要配置不同的 PostCSS 插件，而且对于同一浏览器中的不同 CSS 特性也需要不同的 PostCSS 插件来转换，这样就会导致 PostCSS 的配置非常的庞大且难以维护。

此时，我们还需要安装一个 postcss 插件：**postcss-preset-env**。它可以帮助我们将一些现代化的 css 特性转成大多数浏览器都能识别的特性，并且能够根据目标浏览器或者运行环境添加所需的 polyfill。

```js
npm i postcss-preset-env
```

**配置：**

```js
module.exports = {
  ……
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          'style-loader',
           'css-loader',
           {
            loader: 'postcss-loader',
            options: {
              // 配置postcss插件
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
           }
        ]
      }
    ]
  }
}
```

但是，这样配置只会转换 css 文件，而不会转换 less 或者 sass 文件。如果在 less 和 sass 中配置同样的配置，就会重复许多配置代码。因此在项目开发中，一般会进行下面操作：

1、在根目录下新建一个 postcss.config.js 文件，配置如下：

```js
module.exports = {
  plugins: [require('postcss-preset-env')],
}
```

2、配置 webpack.config.js

```js
module.exports = {
  ……
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            importLoaders: 1
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            importLoaders: 2
          },
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  }
}
```

## Plugin

Loader 是用于特定的模块类型进行转换，也就是说 loader 仅在特定模块加载时使用。

Plugin 可以用于执行更加广泛的任务，目的在于解决 loader 无法实现的其他事。比如打包优化、资源管理、环境变量注入等；plugin 的类型都是一个个的类，它可以贯穿 webpack 整个生命周期。

:::warning
**插件本质上是一个构造函数，它的原型上必须有一个 apply 方法**。在 Webpack 初始化 compiler 对象之后会调用插件实例的 apply 方法，传入 compiler 对象。然后插件就可以在 compiler 上注册想要注册的钩子，Webpack 会在执行到对应阶段时触发注册事件。
:::

### CleanWebpackPlugin

**作用：** 当我们重新打包时，会自动帮助我们删除上次打包生成的目录文件夹，

```js
npm i clean-webpack-plugin -D
```

**配置：**

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  ……
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

:::tip
该插件可以通过在 output 中配置`clean: true`来替换
:::

### HtmlWebpackPlugin

在进行项目部署的时，是需要有对应的入口文件`index.html`；然而，通过 webpack 最终打包的 dist 文件夹中是没有`index.html文件`的。

**HtmlWebpackPlugin**就是对 HTML 进行打包处理的插件，它可以通过 ejs 模块来自动生成一个 index.html 文件。

```js
npm i html-webpack-plugin -D
```

**配置：**

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ……
  new HtmlWebpackPlugin()
}
```

当然，我们也可以在 htmlWebpackPlugin 实例化的时候传入参数

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ……
  new HtmlWebpackPlugin({
    title: '小邓同学',                         // 打包后的index.html的标题标签
    template: './public/index.html'           // 以public文件夹下的index.html为模板来打包
  })
}
```

```html
<!-- public/index.html -->
<!-- 通过ejs语法引入title -->
<title><%= htmlWebpackPlugin.options.title %></title>
```

### DefinePlugin

<div style="text-align: center; margin-top: 20px">
<img src="./img/index_html.png"/>
</div>

上面是 vue 工程中`public/index.html`部分内容，其实 vue 也是基于这个文件生成打包后的 index.html 文件的。我们可以看到代码中会有一些类似这样的语法`<%= 变量 %>`，这个是 EJS 模块填充数据的方式。

其中`<%= htmlWebpackPlugin.options.title %>` 即为之前我们在配置 HtmlWebpackPlugin 插件时配置的 title。但是另外的`<%= BASE_URL %>`会用到一个全局变量`BASE_URL`，但是我们没有配置这个变量，这个时候编译就会出错。

**DefinePlugin**允许在编译时创建配置的**全局常量**，这是一个 webpack 内置的插件（不需要单独安装）。

```js
const {DefinePlugin} = require('webpack')
module.exports = {
  ……
  plugins: [
    new DefinePlugin({
      BASE_URL: "'./'"        //注意写法，相当于const BASE_URL = './'
    })
  ]
}
```

这个时候，就能读取到 BASE_URL 的值并正确编译了。

### CopyWebpackPlugin

我们知道，在 vue 的打包过程中，如果我们将一些文件放到 public 的目录下，那么这个目录会被复制到 dist 文件夹中，当然 index.html 除外，它是作为模板供`html-webpack-plugin`使用来生成 dist 文件夹下的 index.html。

CopyWebpackPlugin 就可以完成这样的复制功能。

```js
npm i copy-webpack-plugin -D
```

**配置：**

复制的规则在`patterns属性`中设置；

**from：** 设置从哪一个源中开始复制；

**to：** 复制到的位置，可以省略，会默认复制到打包的目录下；

**globOptions：** 设置一些额外的选项，其中可以编写需要忽略的文件：

- DS_Store：mac 电脑自动生成的一个文件；

* index.html：也不需要复制，因为我们已经通过 HtmlWebpackPlugin 完成了 index.html 的生成；

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  ……
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: 'public',
          globOptions: ['**/DS_Store：mac', '**/index.html']
        }
      ]
    })
  ]
}
```
