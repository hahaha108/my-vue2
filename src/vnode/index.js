export function renderMixin(Vue) {
    // 标签
    Vue.prototype._c = function () {
        return createElement(...arguments)
    }
    // 文本
    Vue.prototype._v = function (text) { 
        return createText(text)
    }
    // 插值变量
    Vue.prototype._s = function (val) {
        return val == null ? "" : (typeof val === 'object') ? JSON.stringify(val) : val
    }

    Vue.prototype._render = function () {
        let vm = this
        let render = vm.$options.render
        let vnode = render.call(this)
        // console.log('vnode',vnode)
        return vnode
    }
}

// 创建元素
function createElement(tag,data={},...children){
    return vnode(tag,data,data?data.key:undefined,children)
}

// 创建文本
function createText(text){
    return vnode(undefined,undefined,undefined,undefined,text)
}

// 创新虚拟dom
function vnode(tag,data,key,children,text){
    return {
        tag,
        data,
        key,
        children,
        text
    }
}