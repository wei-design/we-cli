#!/usr/bin/env node
/**
 * @Author: forguo
 * @Date: 2023/7/22 10:24
 * @Description: index.js
 */

console.log('@wei_design/we-cli')

// 请求 commander 库
const program = require('commander')

// 从 package.json 文件中请求 version 字段的值，-v和--version是参数
program.version(require('../package.json').version, '-v, --version')

// 解析命令行参数
program.parse(process.argv)
