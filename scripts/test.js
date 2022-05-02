// 构建测试体系
// import ora from 'ora'
// 处理请求参数
const minimist = require('minimist')
const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)
const path = require('path')
// 生成文字ASCII码
const figlet = require('figlet')
const versionStr = figlet.textSync('MrGuang Lib')
// 生成彩色字符画
const Printer = require('@darkobits/lolcatjs')
let rootDir = path.resolve(__dirname, '../')
// 生成loading
const ora = require('ora')

// 使用-p参数来制定要单独测试的包
if (args.p) {
  rootDir = rootDir + '/packages/' + args.p
  const _version = require(rootDir + '/package.json').name
  console.log(Printer.default.fromString(`${_version} test cases \n${versionStr}`))
}

const jestArgs = ['--runInBand', '--rootDir', rootDir]
const spinner = ora(`\n ⏰ ===> running: jest ${jestArgs.join(' ')}`)
spinner.start()
require('jest').run(jestArgs)
spinner.stop()