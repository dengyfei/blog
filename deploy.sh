#!/usr/bin/env sh
 
# 确保脚本抛出遇到的错误
set -e
 
# 生成静态文件 , 
yarn build
rm -rf ../dblog/dist/*

# 将build生成的dist目录拷贝至上一层目录中
cp -rf docs/.vuepress/dist ../dblog/dist

# 进入生成的文件夹
cd ../dblog/dist

# git初始化，每次初始化不影响推送
git init
git add -A
git commit -m 'webpack笔记'

# 如果你想要部署到 https://USERNAME.github.io
git push -f git@github.com:dengyfei/dengyfei.github.io.git master