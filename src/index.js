import { initMixin } from "./init.js"
import { lifecycleMixin } from "./lifecycle.js"
import { renderMixin } from "./vnode/index.js"
import { initGlobApi } from "./global-api/index.js"
import { stateMixin } from "./initState.js"

function Vue(options){
    // 初始化配置项
    this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue) // 添加生命周期
renderMixin(Vue) // 添加render
stateMixin(Vue) // 给 vm 添加 $nextTick

// vue全局的方法
initGlobApi(Vue)

export default Vue