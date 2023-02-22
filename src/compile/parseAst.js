// 创建ast语法树
function createASTElement(tag, attrs) {
    return {
        tag, // 元素
        attrs, // 属性
        children: [], // 子节点
        type: 1, // 类型，DOM里元素的类型是1
        parent: null // 父元素
    }
}

let root; // 根元素
let createParent // 当前元素的父亲
let stack = [] // 栈

// 开始的标签
function start(tagName, attrs) {
    // console.log(tagName, attrs, '开始标签')
    let element = createASTElement(tagName,attrs)
    if(!root){
        root = element
    }
    createParent = element
    stack.push(element)
}
// 文本
function charts(text) {
    // console.log(text, '文本')
    // 去掉空格
    text = text.replace(/\s/g,'')
    if(text){
        createParent.children.push({
            type:3, // 文本的类型是3
            text
        })
    }
}
// 结束的标签
function end(tagName) {
    let element = stack.pop()
    createParent = stack[stack.length - 1]
    if(createParent){
        element.parent = createParent.tag
        createParent.children.push(element)
    }
}

export function parseHTML(html) {
    // html为空时结束
    while (html) {
        // 判断标签
        let textEnd = html.indexOf('<')
        // 是个标签
        if (textEnd === 0) {
            // 开始标签
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue
            }
            // 结束标签
            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
                continue
            }
        }
        let text
        if (textEnd > 0) {
            // 是个文本
            text = html.substring(0, textEnd)
            charts(text)
            // console.log(text)
        }
        if (text) {
            // 删除获取到的文本
            advance(text.length)
            // console.log(html)
        }

        // break
    }
    function parseStartTag() {
        // 解析开始标签
        const start = html.match(startTagOpen)
        // console.log(start)
        if (start) {
            // 解析ast元素
            let match = {
                tagName: start[1],
                attrs: []
            }

            // 删除已经解析的html元素
            advance(start[0].length)

            let attr
            let end
            // 匹配到标签的属性，而且标签没有结束，循环解析标签的属性
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                // console.log(attr)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length)
            }
            if (end) {
                advance(end[0].length)
                return match
            }
        }
    }
    function advance(n) {
        html = html.substring(n)
        // console.log(html)
    }

    return root
}



// 标签名称
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// <span:xx> 特殊标签
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// 开头标签
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// 关闭标签 >
const startTagClose = /^\s*(\/?)>/
// 结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
// 属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
