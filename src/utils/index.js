export const HOOKS = [
    'beforeCreate',
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestory",
    "destroyed"
]
// 策略模式
let starts = {}
starts.data = function(parentVal,childVal){
    return childVal
}
// starts.computed = function(){}
// starts.watch = function(){}
// starts.methods = function(){}
// 遍历生命周期
HOOKS.forEach(hook=>{
    starts[hook] = mergeHook
})
function mergeHook(parentVal,childVal){
    if(childVal){
        if(parentVal){
            return parentVal.concat(childVal)
        }else{
            // 没有父亲，返回一个只有儿子的数组
            return [childVal]
        }
    } else {
        return parentVal
    }
}

export function mergeOptions(parent, child) {
    //  返回这个结构
    // Vue.options = {created:[a,b],watch:[a,b]}
    // console.log(parent,child)
    const options = {}

    for (let key in parent) {
        mergeField(key)
    }

    for (let key in child) {
        mergeField(key)
    }

    function mergeField(key){
        // 根据key 策略模式
        if(starts[key]){
            // 合并options中新、旧的key，合并成一个数组
            options[key] = starts[key](parent[key],child[key])
        } else{
            options[key] = child[key]
        }
    }
    return options
}