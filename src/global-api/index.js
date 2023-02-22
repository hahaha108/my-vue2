import { mergeOptions } from "../utils/index"
export function initGlobApi(Vue){
    // 混入
    Vue.options = {}
    Vue.Mixin = function(mixin){

        this.options = mergeOptions(this.options,mixin)
        // console.log(this.options)
    }
}