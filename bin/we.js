#!/usr/bin/env node
// 用node来运行这个文件
/**
 * @Author: forguo
 * @Date: 2023/7/22 10:24
 * @Description: 入口文件
 */

const program = require('commander')
const chalk = require('chalk')
const pkg = require('../package.json')

program.version(`we-cli ${chalk.green(pkg.version)}`, '-v, --version').usage('<command> [options]')

program
    .command('init <app-name>')
    .description(`generate a project from a remote template`)
    .action(name => {
        require('../packages/init')(name)
    })

program
    .command('create')
    .description(`create a new page or component module【可选项目模式或者组件库模式】`)
    .action(() => {
        require('../packages/create')()
    })

program
    .command('upgrade')
    .description(`check the current version of ${pkg.name}`)
    .action(() => {
        require('../packages/update')()
    })

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    process.exitCode = 1
})

// add some useful info on help
program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`we <command> --help`)} for detailed usage of given command.`)
    console.log()
})

// when options is not exist output help information
if (!process.argv.slice(2).length) {
    program.outputHelp()
}

// 解析命令行参数
program.parse(process.argv)

// function camelize (str) {
//     return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
// }

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
// function cleanArgs(cmd) {
//     const args = {}
//     cmd.options.forEach(o => {
//         const key = camelize(o.long.replace(/^--/, ''))
//         // if an option is not present and Command has a method with the same name
//         // it should not be copied
//         if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
//             args[key] = cmd[key]
//         }
//     })
//     return args
// }
