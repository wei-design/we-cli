/**
 * @Author: forguo
 * @Date: 2023/7/22 10:24
 * @Description: installModules
 */

const chalk = require('chalk')
const inquirer = require('inquirer')
const logSymbols = require('log-symbols')
const ora = require('ora')
const spinner = ora()
const execa = require('execa')

/**
 * @desc 项目依赖安装
 * @param appName 项目名称（项目目录）
 * @return {Promise<unknown>}
 */
const installModules = async function (appName) {
    try {
        // 是否继续完成依赖安装
        const promptConfirm = [
            {
                type: 'confirm',
                name: 'install',
                message: '项目下载完成，是否安装依赖？'
            }
        ]
        const installRes = await inquirer.prompt(promptConfirm)
        if (installRes['install']) {
            try {
                // 选择包管理器
                const promptList = [
                    {
                        type: 'list',
                        name: 'packageManagerType',
                        choices: ['npm', 'pnpm', 'yarn'],
                        message: '请选择包管理器'
                    }
                ]
                const promptRes = await inquirer.prompt(promptList)
                const packageManagerType = promptRes['packageManagerType']

                // 安装依赖
                spinner.start(chalk.blue(`依赖安装中...`))
                await execa(`${packageManagerType}`, ['install'], { cwd: appName })
                spinner.stop()

                // 依赖安装完成
                console.log(logSymbols.success, chalk.green('安装完成！可依次执行以下命令进行开发！'))
                console.log(chalk.blue(`cd ${appName}`))
                console.log(chalk.blue(`${packageManagerType} run dev`))
                return Promise.resolve()
            } catch (err) {
                spinner.stop()
                console.log(chalk.blue(`cd ${appName}`))
                console.log(chalk.blue(`npm install`))
                console.log(chalk.blue(`npm run dev`))
                if (err) return Promise.reject(err)
            }
        } else {
            console.log(logSymbols.success, chalk.green('项目下载完成！可依次执行以下命令进行开发！'))
            console.log(chalk.blue(`cd ${appName}`))
            console.log(chalk.blue(`npm install`))
            console.log(chalk.blue(`npm run dev`))
        }
    } catch (err) {
        spinner.stop()
        if (err) return Promise.reject(err)
    }
}

module.exports = installModules
