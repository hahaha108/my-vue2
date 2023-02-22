import { patch } from "./vnode/patch"

export function mounetComponent(vm, el) {
    // 把render函数变成vnode，再将vnode变成真实dom，再放到页面上
    // vm._render：把render函数变成vnode
    // vm._update：将vnode变成真实dom，再放到页面上
    vm._update(vm._render())
}

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        let vm = this
        // 两个参数（1.旧dom 2.vnode）
        vm.$el = patch(vm.$el, vnode)
    }
}