export function patch(oldvnode,vnode){
    // console.log(oldvnode,vnode)
    // 1 创建新dom
    let el = createEl(vnode)
    // console.log(el)
    // 2 替换 1)获取父节点 2)插入 3)删除
    let parentEl = oldvnode.parentNode // body
    parentEl.insertBefore(el,oldvnode.nextsibling)
    parentEl.removeChild(oldvnode)
    return el
}

// 创建dom
function createEl(vnode){
    let {tag,children,key,data,text} = vnode
    if (typeof tag === 'string'){
        // 创建标签
        vnode.el = document.createElement(tag)
        // 处理children
        if (children.length > 0){
            children.forEach(child => {
                // 递归添加子标签
                vnode.el.appendChild(createEl(child))
            });
        }
    } else {
        // 处理文本
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}