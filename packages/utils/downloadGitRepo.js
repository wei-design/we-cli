/**
 * @Author: forguo
 * @Date: 2023/7/22 10:24
 * @Description: download-git-repo
 */

const fs = require('fs-extra')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora()
const logSymbols = require('log-symbols')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const execa = require('execa')
const { githosting, gitusername, templateList } = require('../config')
const installModules = require('./installModules')

/**
 * @desc 项目模板下载
 * @param appName
 * @param targetDir（本地目录）
 * @param clone
 * If true use git clone instead of an http download. While this can be a bit slower, it does allow private repositories to be used if the appropriate SSH keys are setup.
 * @return {Promise<unknown>}
 */
const downloadGitRepo = async function (appName, targetDir, clone = false) {
    try {
        // 选择项目类型
        const promptList = [
            {
                type: 'list',
                name: 'templateType',
                choices: templateList,
                message: '请选择项目类型'
            }
        ]
        const promptRes = await inquirer.prompt(promptList)
        const templateType = promptRes['templateType']

        /*******仓库地址********/
        // 仓库地址 不是复制的https://github.com/xxx/xxx.git
        // 正确写法：'github:username/repository#master'
        /*******仓库地址********/

        const gitPath = `${githosting}:${gitusername}/${templateType}-quick-start#master`
        fs.mkdirp(targetDir, async () => {
            // 项目目录创建
            console.log(logSymbols.info, `创建项目目录：`, chalk.green(`${targetDir}`))
            spinner.start(chalk.blue(`项目传送中：${gitPath}`))

            // 项目下载
            download(gitPath, targetDir, { clone }, async err => {
                spinner.stop()
                if (err) return Promise.reject(err)
                try {
                    // git init
                    await execa('git', ['init'], { cwd: targetDir })
                    // 依赖安装
                    await installModules(appName)
                    return Promise.resolve()
                } catch (err) {
                    console.log(logSymbols.error, `安装失败，请尝试手动完成安装！错误信息：`, chalk.red(`${err}`))
                }
            })
        })
    } catch (err) {
        spinner.stop()
        if (err) return Promise.reject(err)
    }
}

module.exports = downloadGitRepo
