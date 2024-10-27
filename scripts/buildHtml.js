const path = require('path')
const fs = require('fs')

// 同步将 html 文件转换为 ts 文件中的导出函数，便于插件使用

const htmlPath = path.resolve(__dirname, '../src/view/screepsView.html')
const funcPath = path.resolve(__dirname, '../src/view/getWebviewContent.ts')

let html = fs.readFileSync(htmlPath, 'utf-8')
// 将 html 中的特殊字符转义，避免在模板字符串中出现问题，如 `、$ 等
html = html.replace(/`/g, '\\`').replace(/\${/g, '\\${')

const func = `
const getWebviewContent = () => {
    return \`${html}\`
}

export default getWebviewContent
`

fs.writeFileSync(funcPath, func)
console.log('html 转换成功')
