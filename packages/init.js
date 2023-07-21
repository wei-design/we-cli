/**
 * @Author: forguo
 * @Date: 2023/7/18 16:26
 * @Description: init.js
 */

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const { downloadGitRepo } = require('./utils')
/**
 * 初始化项目
 * @param appName
 * @return {boolean}
 */
const init = async appName => {
    // process.cwd() 方法返回 Node.js 进程的当前工作目录。
    // path.resolve 解析为一个绝对路径
    const targetDir = path.resolve(process.cwd(), appName || 'app')
    if (!targetDir) {
        console.error(logSymbols.warning, chalk.red(`App name can not be empty`))
        return false
    }
    if (fs.existsSync(targetDir)) {
        console.error(logSymbols.warning, chalk.red(`App <${appName}> is exist`))
        return false
    }
    try {
        // 下载
        await downloadGitRepo(appName, targetDir)
    } catch (err) {
        console.log(logSymbols.error, `项目创建失败，错误信息：`, chalk.red(`${err}`))
    }
}

module.exports = init
