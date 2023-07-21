/**
 * @Author: forguo
 * @Date: 2023/7/18 16:26
 * @Description: init project
 */

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const { downloadGitRepo } = require('./utils')

/**
 * 初始化项目
 * @param name
 */
module.exports = async name => {
    // process.cwd() 方法返回 Node.js 进程的当前工作目录。
    // path.resolve 解析为一个绝对路径
    if (!name) {
        console.error(logSymbols.warning, chalk.red(`App name can not be empty`))
        return false
    }
    const targetDir = path.resolve(process.cwd(), name)
    if (fs.existsSync(targetDir)) {
        console.error(logSymbols.warning, chalk.red(`App <${name}> is exist`))
        return false
    }
    try {
        // 下载
        await downloadGitRepo(name, targetDir)
    } catch (err) {
        console.error(logSymbols.error, `项目创建失败，错误信息：`, chalk.red(`${err}`))
    }
}
