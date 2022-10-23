module.exports = [
    {
        text: '首页', link: '/', icon: 'reco-eye'
    },
    {
        text: '前端框架', icon: 'reco-api',
        items: [
            {
                text: 'React',
                items: [
                    { text: 'React基础', link: '/react/react' },
                ]
            }
        ]
    },
    {
        text: '前端基础', link: '/生活分享/', icon: 'reco-faq',
        items: [
            { text: '生活分享', link: '/生活分享/life' },
        ]
    },
    {
        text: '博客', icon: 'reco-blog',
        items: [
            { text: '腾讯', link: 'https://how.ke.qq.com/', icon: 'reco-blog' },
            { text: 'B站', link: 'https://space.bilibili.com/394702492', icon: 'reco-bilibili' },
            { text: '君哥', link: 'https://www.it235.com/', icon: 'reco-blog' },
        ]
    },/**/
    { text: '时间轴', link: '/timeline/', icon: 'reco-date' }
]