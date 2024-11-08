#!/usr/bin/env node
// 用node来运行这个文件

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
    .command('create <module-name>')
    .description(`create a new page or component module [vue3 + ts is default]`)
    .action(name => {
        require('../packages/create')(name)
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
