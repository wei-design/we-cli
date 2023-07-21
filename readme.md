# @wei_design/we-cli

we-cli, a node cli tool for wei_design

## Usage

- npm

``` sh
npm install
npm install -g
```

## 功能

### we init

创建模板项目

支持以下类型：

- vue2 
- vue3
- react
- taro
- koa2
- vitepress

### we create

创建组件【可选vue2及vue3组件，或者组件库模式】

### we upgrade 

升级

## 用到的包

chalk （控制台字符样式）
commander （实现 NodeJS 命令行）
download （实现文件远程下载）
fs-extra （增强的基础文件操作库）
handlebars （实现模板字符替换）
inquirer （实现命令行之间的交互）
log-symbols （为各种日志级别提供着色符号）
ora （优雅终端 Spinner 等待动画）
update-notifier （npm 在线检查更新）
