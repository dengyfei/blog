# 依赖与源码

Vite 将应用中的模块区分为 `依赖` 和 `源码` 两类。

依赖部分：更多指的是代码中使用到的第三方模块，比如 vue、lodash、react 等。这一部分，vite会使用esbuild进行依赖预构建。

源码部分：比如说平常我们书写的一个一个 js、jsx、vue 等文件，这部分代码会在运行时被编译，并不会进行任何打包。

Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。而对于依赖，Vite 将会使用 esbuild 在应用启动时对于依赖部分进行预构建依赖

# 依赖预构建

简单来说，所谓依赖预构建指的是在 DevServer 启动之前，Vite 会扫描使用到的依赖从而进行构建，之后在代码中每次导入(import)时会动态地加载构建过的依赖这一过程，
当我们引入一个第三方库，比如 lodash：

```js
import _ from 'lodash'
```

上面的代码如果不经过 vite/webpack 等构建构建打包，而直接在浏览器当中运行的时候，浏览器会报错。因为浏览器规定所有的引入路径只能是相对路径或者绝对路径。那有的人可能就会疑惑，为什么浏览器不支持自动到`node_modules`中寻找对应的模块呢？那是因为浏览器不敢这样做。比如我们引入了 lodash，而 lodash 可能又会引入许许多多的第三方库，这些库的引入都需要浏览器通过网络接口获取，那么会有成千上万的接口请求，严重影响性能，它当然不敢这样做。

而 vite 的依赖预构建就完美的解决了这个问题，不仅如此，vite 的依赖预构建还有其他更重要的作用。

vite 依赖预构建的过程是：首先 vite 会找到对应的依赖，然后调用 esbuild(对 js 语法进行处理的一个库)，将其他模块化规范的代码转化成 es Module 规范，然后放到当前目录下的`node_modules/.vite/deps`目录下，同时对 es Module 规范的各个模块进行统一集成。

它主要解决了以下三个问题：

- 不同的第三方包会有不同的导出格式，有个可能是 commonjs，有的可能是 umd，有的可能是 es Module。而 vite 的依赖预构建过程中，esbuild 会解析每个包的语法，并且把他们都转换成浏览器认识的 es Module 规范。

- 解决了路径引入问题，比如上面对 lodash 的引入，vite 会重写这段代码：

```js
import _ from '/node_modules/.vite/deps/lodash.js'
```

这样，浏览器直接去当`/node_modules/vite/deps`路径下寻找所有导入的库即可。

- 网络多包传输的性能问题。前面讲了，当 lodash 中引入其他包的时候，浏览器会再次发起网络请求来或者这个包，但是 vite 却解决了这个问题。因为 vite 会对 esbuild 构建后的符合 es Module 规范的各个模块进行统一集成。举个例子：

```js
//a.js
export default function a {}
```

```js
//b.js
export { default as a } from './a.js'
```

如果此时引入 b.js，必然又会去加载 a.js。而 vite 会重写 b.js 当中的代码：

```js
function a {}
```

没错，直接把 a.js 导出的内容重写到 b.js 当中，此时浏览器就不会再去加载 a.js 了。

## 依赖预构建的缓存
### 文件系统的缓存
Vite 将预构建的依赖项缓存到 node_modules/.vite 中。它会基于以下几个来源来决定是否需要重新运行预构建步骤：

* 包管理器的锁文件内容，例如 package-lock.json，yarn.lock，pnpm-lock.yaml，或者 bun.lockb；

* 补丁文件夹的修改时间；vite.config.js 中的相关字段；

* NODE_ENV 的值。

只有在上述其中一项发生更改时，才需要重新运行预构建。

如果出于某些原因你想要强制 Vite 重新构建依赖项，你可以在启动开发服务器时指定 --force 选项，或手动删除 node_modules/.vite 缓存目录。
## 浏览器缓存
已预构建的依赖请求使用 HTTP 头 max-age=31536000, immutable 进行强缓存，以提高开发期间页面重新加载的性能。一旦被缓存，这些请求将永远不会再次访问开发服务器。如果安装了不同版本的依赖项（这反映在包管理器的 lockfile 中），则会通过附加版本查询自动失效。
# vite 配置

## 配置提示

vite 的配置是写在 vite.config.js 文件中的。但是 vite 的配置太多了，不太容易记住，这个时候配置提示就显得非常重要了。

有两种方式可以配置提示：

1、使用`defineConfig`函数

```js
//vite.config.js

import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {},
})
```

2、使用类型注释

```js
/**@type import('vite').UserConfig*/

export default {
  optimizeDeps: {},
}
```

## 环境配置

我们在实际开发中，生产环境和开发环境通常会使用两套不一样的配置，比较好的做法就是以下流程：

1、新建一个`vite.base.config.js`、`vite.dev.config.js`和`vite.pord.config.js`文件，并书写好各自的配置

2、然后在`vite.config.js`文件中如下：

```js
import { defineConfig } from 'vite'

import viteDevConfig from './vite.dev.config'
import viteBaseConfig from './vite.base.config'
import viteProdConfig from './vite.prod.config'

const envResolver = {
  build: () => ({ ...viteBaseConfig, ...viteDevConfig }),
  serve: () => ({ ...viteBaseConfig, ...viteProdConfig }),
}
export default defineConfig(({ command }) => {
  /**
   * command的类型为：'build' | 'serve'
   * 其真实取值取决于执行的命令是'vite build'还是'vite'
   */
  return envResolver[command]()
})
```

:::tip
一个小知识点，vite.config.js 是运行在 node 环境下的，那么为什么 vite.config.js 是使用 es Module 规范呢？原因是 vite 会先于 node 去读取并解析 vite.config.js 文件，如果发现是 es Module 规范，vite 会直接将其转化成 commonjs 规范，转化过程也很简单，其实就是利用 string.replace 方法，将 import 和 export 等进行替换。
:::

## 环境变量的配置

环境变量： 会根据当前的代码环境产生变化的变量就叫环境变量。即在生产环境，测试环境和开发环境、灰度环境有不一样的值的变量。

### node 端获取环境变量

vite 在处理环境变量的时候是使用的一个叫`dotenv`的第三方库，dotenv 会自动读取`.env`文件，并解析这个文件的对应环境变量，最后将其注入到`process对象`下。 但是，vite 考虑到和其他配置的一些冲突问题，它不会直接注入到 process 对象下，因此，vite 给我们提供了一个`loadEnv`的方法来手动确认 env 文件。

```js
import viteDevConfig from './vite.dev.config'
import viteBaseConfig from './vite.base.config'
import viteProdConfig from './vite.prod.config'
import { loadEnv, defineConfig } from 'vite'

const envResolver = {
  build: () => {
    return { ...viteBaseConfig, ...viteDevConfig }
  },
  serve: () => {
    return { ...viteBaseConfig, ...viteProdConfig }
  },
}
export default defineConfig(({ command, mode }) => {
  /**
   * process.cwd返回的是node此时运行的进程的目录
   */
  /**
   * @description: 手动设置环境变量
   * @param: 参数一： mode:启动模式，development | production
   * @param: 参数二： envDir: 环境变量文件存放目录
   * @param: 参数三： prefixes: 环境变量文件名，默认为.env,可省略。
   * @return {*}
   */
  const env = loadEnv(mode, process.cwd(), '')
  return envResolver[command]()
})
```

当我们调用 loadenv 函数的时候，它会做如下几件事：
1、直接找到.env 文件，解析其中的环境变量，并放到一个对象里
2、将传进来的 mode 的值进行拼接成`.env.[mode]`，然后去找`.env.development`或者`.env.production`文件，解析其中的环境变量，并放到一个对象中。
3、将两个对象合成一个对象：

```js
const baseEnvConfig = 读取.env的配置
const modeEnvConfig = 读取.env.[mode]的配置
const lastEnvConfig = {...baseEnvConfig, ...modeEnvConfig}
```

### 客户端环境变量的获取

如果是客户端，vite 会将对应的环境变量注入到 import.meta.env 里面，不过在此之前，vite 为了防止我们将隐私性的变量直接送进 import.meta.env 中，所以它做了一层拦截：如果你的变量不是以`VITE_`开头的，vite 实际上是不会帮你注入到客户端中去的。

```js
// main.js

const app_key = import.meta.env.VITE_APP_KEY
```

当然，如果想要修改`VITE_`这个前缀，我们也可以通过`envPrefix`配置修改。

```js
// vite.config.js

export default {
  envPrefix: 'ENV_',
}
```

# vite 对 css 的处理

vite 天生就支持 css 文件，在读取到 js 文件中引入 css 文件时，vite 会做以下几件事：

1、直接使用 fs 模块去读取 css 文件内容
2、直接创建一个 style 标签，并将读取到的 css 文件内容 copy 到 style 标签里
3、将 style 标签插入到 head 中
4、将 css 文件中的内容直接替换成 js 脚本(方便热更新或者 css 模块化)，同时设置 Content-Type 为`text/js`，从而让浏览器以 js 脚本的形式来执行 css 文件。

# vite 对路径的处理

vite.config.js 是运行在 node 环境下的，而 node 端去读取文件或者操作文件的时候，如果发现你使用的是相对路径，则会尝试使用`process.cwd`来拼接成绝对路径。而`process.cwd`返回的是当前 node 执行的执行路径。因此在`vite.config.js`文件中的相对路径通常使用`process.resolve`来处理。

# vite 插件

## vite-aliases

vit-aliases 插件的作用是自动生成别名配置。通过检测当前目录下的 src 目录下的所有文件夹，并生成别名配置。比如有以下目录：

```yaml
-src
-assets
-component
```

最终会生成如下配置：

```js
{
  '@': '/**/src',
  '@assets': '/**/src/assets',
  '@component': '/**/src/component'
}
```

**使用：**
首先安装一下：

```js
pnpm add vite-aliases -D
```

```js
// vite.config.js

import { ViteAliases } from 'vite-aliases'

export default {
  plugins: [ViteAliases()],
}
```

# 分包

什么是分包，为什么要分包？

这就得从浏览器的缓存策略说起了。浏览器在请求静态资源之前会先扫描缓存当中是否存在文件名相同的文件，如果文件名相同，则会直接从缓存中获取，而不会向服务器发出请求，以节省服务器资源。

我们可以发现，当我们通过webpack或vite等构建工具打包时，输出的文件名总是会带一窜毫无规律的字符，这其实是一窜hash字符串。如果文件未经任何修改，那么再次生成的hash字符串就一定是一样的，相反，只要文件有任何的修改，所生成的hash字符串就必定与前一次不同。此时，浏览器在请求该文件的时候，他会发现缓存中的hash字符串和现在的不一样，然后就会向服务器发起请求，而对于那么没有修改过的文件，hash字符串仍和缓存中的一样，则会从缓存中获取。

基于此，我们可以想象一下，如果我们在一个文件中引入了某个第三方包，我们是不会去动这个第三包里面的代码的，也就没必要让浏览器每次都请求服务器。所以我们一般会将一些不会经常更新的文件(比如引入的第三方库)进行单独打包处理，以后vite和webpack每次打包生成的这部分文件的hash字符串都不会发生改变，浏览器也就会直接从缓存中获取，减轻服务器的压力，这个过程就称为**分包**

```js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if(id.includes('node_modules')) {
                        return 'vendor'
                    }
                }
            }
        }
    }
})

```