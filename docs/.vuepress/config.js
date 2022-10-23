const navConf = require('./config/nav')
const pluginsConf = require('./config/plugins/index')
module.exports = {
    //注意，此处需要填写你部署在nginx下的文件夹名称，如果是根目录，那么可以注释掉此行，注释掉后本地打开index.html无法访问
    //base: "/dist/",
    title: "君哥聊编程",
    description: '点赞、转发、收藏',
    port: '7777',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
        ['meta', { name: 'keywords', content: '君哥聊编程,vuepress,自建博客,君哥' }],
        ['meta', { name: 'description', content: '专属于自学者的在线学习平台,这里有编程领域最完善最「体系化的」Java学习视频、如果你是小白快加入我们一起学最全最「体系化的」java知识吧，官方交流QQ群：827553720' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ["meta", { name: "author", content: "君哥" }],
        ["link", { rel: "stylesheet", href: "/css/style.css" }],//显示nav小logo
        // ["script", { charset: "utf-8", src: "/js/custom.js" }],//加载左侧菜单栏图片
    ],
    theme: 'reco',
    themeConfig: {
        type: 'blog',
        smoothScroll: true,
        authorAvatar: '/avatar.png',
        // 最后更新时间
        lastUpdated: '2021-04-07', // string | boolean
        author: '君哥',
        // 项目开始时间
        startYear: '2022',
        nav: navConf,
        sidebarDepth: 4,
        // 自动形成侧边导航
        sidebar: 'auto',
    },
    markdown: {
        lineNumbers: true
    },
    plugins: pluginsConf
}