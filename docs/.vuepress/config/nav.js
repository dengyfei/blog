module.exports = [
  {
    text: '首页',
    link: '/',
    icon: 'reco-eye',
  },
  {
    text: '前端框架',
    icon: 'reco-api',
    items: [
      {
        text: 'React',
        items: [
          { text: 'React基础', link: '/frame/react/react/react' },
          { text: 'Redux', link: '/frame/react/redux/redux' },
          { text: 'React router v5', link: '/frame/react/router/router' },
        ],
      },
    ],
  },
  {
    text: '前端基础',
    icon: 'reco-faq',
    items: [
      { text: 'css', link: '/basic/css/sass' },
      { text: 'webpack', link: '/basic/webpack/webpack' },
      { text: 'babel', link: '/basic/babel/babel' },
      { text: 'git', link: '/basic/git/git' },
    ],
  },
  {
    text: '算法',
    link: 'algorithm/algorithm.md',
  },
  {
    text: '博客',
    icon: 'reco-blog',
    items: [
      { text: '腾讯', link: 'https://how.ke.qq.com/', icon: 'reco-blog' },
      {
        text: 'B站',
        link: 'https://space.bilibili.com/394702492',
        icon: 'reco-bilibili',
      },
      { text: '君哥', link: 'https://www.it235.com/', icon: 'reco-blog' },
    ],
  } /**/,
  { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
]
