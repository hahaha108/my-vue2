import { parseHTML } from "./parseAst"
import { generate } from "./generate"

// 编译模板
export function compileToFunction(el) {
    // console.log(el)
    // 1.解析ast语法树(将html变成ast语法树)
    let ast = parseHTML(el)
    // console.log('ast',ast)
    // 2.将ast语法树变成字符串
    let code = generate(ast)
    // 3.将字符串变成render函数
    let render = new Function(`with(this){return ${code}}`)
    // console.log(render)
    return render
}
