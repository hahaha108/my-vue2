import { initMixin } from "./init.js"

function Vue(options){
    // 初始化配置项
    this._init(options)
}

initMixin(Vue)


export default Vue