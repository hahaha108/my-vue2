import { parseHTML } from "./parseAst"
import { generate } from "./generate"

// 编译模板
export function compileToFunction(el) {
    // console.log(el)
    // 解析ast语法树(将html变成ast语法树)
    let ast = parseHTML(el)
    // console.log(ast)
    // 将ast语法树变成字符串 =》 将字符串变成render函数
    let code = generate(ast)
}
