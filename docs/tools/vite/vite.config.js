import { defineConfig } from 'vite'
import {ViteAliases} from 'vite-aliases'

const path = require('path')
const postcssPresetEnv = require('postcss-preset-env')

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    optimizeDeps: {
        exclude: []  //将指定数组中的依赖不进行依赖预构建
    },
    envPrefix: 'ENV',  // 配置vite注入客户端环境变量校验的env前缀
    css: {  //对css的行为进行配置
        modules: {   //对css模块化的默认行为进行覆盖，该配置最终会传至 postcss module中
            localsConvention: 'dashesOnly',  //修改生成的配置对象的key的展示形式(驼峰还是中划线)
            scopeBehaviour: 'local',  //配置当前的模块行为时模块化还是全局化
        },
        preprocessorOptions: {  // key + config的形式，key代表预处理器的名字
            scss: {

            }
        },
        devSourcemap: true,  //开启css的sourceMap
        postcss: {  //对postcss做配置
            plugins: [postcssPresetEnv()]
        }
    },
    build: {  //构建生产包时的策略
        rollupOptions: {    // 配置rollup的一些配置
            output: {       // 控制输出
                // 输出静态文件的形式
                assetFileNames: '[hash].[name].[ext]'
            }
        },
        // 小于该大小的图片将转化成base64，直接插入文件，默认为4096bit，即，4kb
        assetsInlineLimit: 4096,
        outDir: 'dist',   //输出目录，默认为dist
        assetsDir: 'static',  //输出目录中的静态文件目录，默认为assets
        emptyOutDir: true  // 每次打包前，是否自动清除输出目录中的所有东西，默认为true
    },
    plugins: [
        ViteAliases()
    ]
})