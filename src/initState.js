import { observer } from "./observe/index.js"
import Watcher from "./observe/watcher.js"
import { nextTick } from "./utils/nextTick.js"

export function initState(vm) {
    let opts = vm.$options
    console.log(opts)

    // 判断是否有属性，来进行初始化
    if (opts.data) {
        initData(vm)
    }
    if (opts.props) {
        initProps()
    }
    if (opts.watch) {
        initWatch(vm)
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.methods) {
        initMethods()
    }
}

// 对data数据进行初始化
function initData(vm) {
    let data = vm.$options.data
    // 获取data中的数据
    data = vm._data = typeof data === 'function' ? data.apply(vm) : data
    // console.log(data)

    // 将data中的所有属性代理到Vue实例上
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    // 对data中数据进行劫持
    observer(data)
}

function initProps() { }

function initWatch(vm) { 
    let watch = vm.$options.watch
    // console.log(watch)
    for(let key in watch){
        // 获取到属性对应的值
        let handler = watch[key]
        if(Array.isArray(handler)){
            // 数组
            handler.forEach((item)=>{
                createWatcher(vm,key,item)
            })
        } else {
            // 对象、字符串
            createWatcher(vm,key,handler)

        }
    }
}

// 格式化处理
function createWatcher(vm,expOrfn,handler,options){
    // 处理handler
    if (typeof handler === 'object'){
        options = handler
        handler = handler.handler // 对象的handler作为handler
    }
    if (typeof handler === 'string'){
        handler = vm[handler] // 将实例上的方法作为hander
    }
    // watch的最终处理 $watch
    return vm.$watch(expOrfn,handler,options)
}

function initComputed() { }

function initMethods() { }

// 把Vue._data上的属性代理映射到Vue实例上
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

export function stateMixin(Vue){
    // 列队
    Vue.prototype.$nextTick = function(cb){
        // console.log(cb)
        nextTick(cb)
    },
    Vue.prototype.$watch = function(expOrfn,handler,options){
        // console.log(111,expOrfn,handler,options)
        // 实现watch
        let watcher = new Watcher(this,expOrfn,handler,{...options,user:true})
        if(options && options.immediate){
            handler.call(this)
        }
    }
}