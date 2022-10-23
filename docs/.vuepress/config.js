const navConf = require('./config/nav')
const pluginsConf = require('./config/plugins/index')
module.exports = {
    //注意，此处需要填写你部署在nginx下的文件夹名称，如果是根目录，那么可以注释掉此行，注释掉后本地打开index.html无法访问
    //base: "/dist/",
    title: "小邓个人博客",
    description: '点赞、转发、收藏',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
        ['meta', { name: 'keywords', content: '大飞聊编程,vuepress,自建博客,大飞' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ["meta", { name: "author", content: "大飞" }],
        ["link", { rel: "stylesheet", href: "/css/style.css" }],//显示nav小logo
        // ["script", { charset: "utf-8", src: "/js/custom.js" }],//加载左侧菜单栏图片
    ],
    theme: 'reco',
    themeConfig: {
        type: 'blog',
        smoothScroll: true,
        authorAvatar: '/avatar.png',
        // 最后更新时间
        lastUpdated: '上次更新', // string | boolean
        author: '小邓',
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