// 处理属性列表
function genPorps(attrs){
    let str = ''
    // console.log(attrs)
    for(let i=0;i< attrs.length;i++){
        let attr = attrs[i]
        // {style:"color:red;font-size:20px"} => {style:{color:"red",font-size:"20px"}}
        if (attr.name === 'style'){
            let obj = {}
            attr.value.split(';').forEach(item => {
                let [key,val] = item.split(':')
                // console.log(key,val)
                obj[key] = val
            });
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    // console.log(`{${str.slice(0,-1)}}`)
    return `{${str.slice(0,-1)}}`
}

// 处理子节点列表
function genChildren(el){
    let children = el.children
    if (children){
        return children.map(child => gen(child)).join(',')
    }
}

// 处理具体子节点
function gen(node){
    if(node.type === 1){
        // 子节点是元素节点
        return generate(node)
    } else {
        // 子节点是文本节点
        let text = node.text
        if(!defaultTagRE.test(text)){
            // 没有插值表达式（{{}}）的情况
            return `_v(${JSON.stringify(text)})`
        }
        // 处理带有插值表达式的
        let tokens = []
        // 因为defaultTagRE的global标志被设置为true
        // 必须设置defaultTagRE.lastIndex=0，使下次从头开始匹配
        let lastindex = defaultTagRE.lastIndex = 0
        let match
        while (match = defaultTagRE.exec(text)){
            let index = match.index
            // 添加内容
            // 这里说明插值表达式前面有文本内容
            if (index>lastindex){
                // 截取并添加插值表达式前面的文本内容
                tokens.push(JSON.stringify(text.slice(lastindex,index)))
            }
            // 插值表达式内的内容 _s()是处理插值表达式的
            tokens.push(`_s(${match[1].trim()})`)
            lastindex = index + match[0].length
        }
        // 这里说明插值表达式后面有文本内容
        if (lastindex<text.length){
            tokens.push(JSON.stringify(text.slice(lastindex)))
        }
        // 处理文本节点，用_v()包裹
        // 可以相加是因为_s()的返回值也是文本
        return `_v(${tokens.join('+')})`
    }
}

// 处理元素节点
export function generate(el){
    // console.log(el)
    let children = genChildren(el)
    /**
     *  _c()：处理元素节点
     *  _v()：处理文本节点
     *  _s()：处理插值运算符 {{}}
     */
    let code = `_c("${el.tag}",${el.attrs.length?`${genPorps(el.attrs)}`:'null'},${children?children:'null'})`
    // console.log(code)
    return code
}

// {{}}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g