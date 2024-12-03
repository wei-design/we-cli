/**
 * @Author: forguo
 * @Date: 2023/7/22 10:24
 * @Description: create component
 */

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const dayjs = require('dayjs')
const { readFoldFiles } = require('./utils')
/**
 * 创建组件
 * @param name
 */
module.exports = async name => {
    try {
        // process.cwd() 方法返回 Node.js 进程的当前工作目录。
        // path.resolve 解析为一个绝对路径
        if (!name) {
            console.error(logSymbols.warning, chalk.red(`Module name Can not be empty`))
            return false
        }

        // 选择创建页面还是组件
        const { moduleType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'moduleType',
                message: '请选择页面或者组件类型',
                choices: [
                    {
                        name: 'es-package',
                        value: 'es-package'
                    },
                    {
                        name: 'vue-page-curd',
                        value: 'vue-page-curd'
                    },
                    {
                        name: 'vue-component',
                        value: 'vue-component'
                    },
                    {
                        name: 'vue-component-global',
                        value: 'vue-component-global'
                    }
                ]
            }
        ])

        // 目标目录
        const targetDir = path.resolve(process.cwd(), name)

        // 判断文件是否存在
        if (fs.existsSync(targetDir)) {
            console.error(logSymbols.warning, chalk.red(`${moduleType} <${name}> is exist`))
            return false
        }

        // 模板目录
        const templateDir = path.resolve(__dirname, `../template/${moduleType}`)

        // 创建目录
        await fs.mkdirp(targetDir)

        try {
            // 复制模板
            await fs.copy(templateDir, targetDir)

            // 模板数据
            const data = {
                name,
                author: process.env.USERNAME,
                date: dayjs().format('YYYY-MM-DD HH:mm:ss')
            }

            // 读取文件夹下的所有文件
            readFoldFiles(targetDir).forEach(filePath => {
                // 读取模板文件
                const template = fs.readFileSync(filePath, 'utf-8')
                // 模板替换
                const res = handlebars.compile(template)(data)
                fs.outputFileSync(filePath, res)
            })
            console.log(logSymbols.success, chalk.green(`${moduleType} <${name}> create success`))
        } catch (e) {
            console.error(logSymbols.error, `Copy template failed:`, chalk.red(`${e}`))
        }
    } catch (err) {
        console.error(logSymbols.error, `Create failed:`, chalk.red(`${err}`))
    }
}
