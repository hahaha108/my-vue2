import { initState } from "./initState"
import { compileToFunction } from "./compile/index.js"

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // console.log(options)
        let vm = this
        vm.$options = options
        // 初始化状态
        initState(vm)

        // 渲染模板
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function(el){
        // console.log(el)
        let vm = this
        el = document.querySelector(el)
        let options = vm.$options
        // 有没有render
        if(!options.render){
            let template = options.template
            if(!template && el){
                // 没有template但是el
                el = el.outerHTML
                // console.log(el)
                // 变成ast语法树
                let ast = compileToFunction(el)
            }
        }
    }
}



