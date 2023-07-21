/**
 * @Author: forguo
 * @Date: 2023/7/22 22:24
 * @Description: readFoldFiles.js
 */
const fs = require('fs-extra')
const path = require('path')

/**
 * 读取文件夹下所有文件
 * @param dir
 * @return {*[]}
 */
module.exports = function readFoldFiles(dir) {
    let list = []
    const files = fs.readdirSync(dir)
    files.forEach(file => {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            list = [...list, ...readFoldFiles(filePath)]
        } else if (stats.isFile()) {
            list.push(filePath)
        }
    })
    return list
}
