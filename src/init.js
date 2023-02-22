import { initState } from "./initState"
import { compileToFunction } from "./compile/index.js"
import { mounetComponent,callHook } from "./lifecycle"
import { mergeOptions } from "./utils/index"

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // console.log(options)
        let vm = this
        vm.$options = mergeOptions(Vue.options,options)

        callHook(vm,'beforeCreate')
        // 初始化状态
        initState(vm)
        callHook(vm,'created')

        // 渲染模板
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function(el){
        // console.log(el)
        let vm = this
        el = document.querySelector(el)
        vm.$el = el
        let options = vm.$options
        // 有没有render
        if(!options.render){
            let template = options.template
            if(!template && el){
                // 没有template但是el
                el = el.outerHTML
                // console.log(el)
                // 把模板编译成render函数
                let render = compileToFunction(el)
                // console.log(render)
                options.render = render
            }
        }
        // 挂载组件
        mounetComponent(vm,el)
    }
}



