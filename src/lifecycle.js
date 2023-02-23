import { patch } from "./vnode/patch"
import Watcher from "./observe/watcher"

export function mounetComponent(vm, el) {
    // 把render函数变成vnode，再将vnode变成真实dom，再放到页面上
    // vm._render：把render函数变成vnode
    // vm._update：将vnode变成真实dom，再放到页面上
    callHook(vm,'beforeMount')
    // vm._update(vm._render())
    let updateComponent = () => {
        vm._update(vm._render())
    }
    new Watcher(vm,updateComponent,()=>{},true)
    callHook(vm,'mounted')
}

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        let vm = this
        // 两个参数（1.旧dom 2.vnode）
        vm.$el = patch(vm.$el, vnode)
    }
}

// 生命周期调用
export function callHook(vm, hook) {
    const hanlers = vm.$options[hook]
    if (hanlers) {
        for (let i = 0; i < hanlers.length; i++) {
            hanlers[i].call(vm)
        }
    }
}