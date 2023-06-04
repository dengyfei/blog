#!/usr/bin/env sh
###
 # @Author: Deng YF 1240517822@qq.com
 # @Date: 2023-05-25 23:12:53
 # @LastEditors: Deng YF 1240517822@qq.com
 # @LastEditTime: 2023-05-30 20:47:59
 # @FilePath: \blog\deploy.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
### 
 
# 确保脚本抛出遇到的错误
set -e
 
# 生成静态文件 , 
yarn build
# rm -rf ../dblog/dist/*

# 将build生成的dist目录拷贝至上一层目录中
# cp -rf docs/.vuepress/dist ../dblog/dist

# 进入生成的文件夹
# cd ../dblog/dist
cd docs/.vuepress/dist

# # git初始化，每次初始化不影响推送
git init
git add -A
git commit -m '提交博客'

# 如果你想要部署到 https://USERNAME.github.io
git push -f git@github.com:dengyfei/dengyfei.github.io.git master