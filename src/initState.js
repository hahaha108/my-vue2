import { observer } from "./observe/index.js"

export function initState(vm) {
    let opts = vm.$options
    // console.log(opts)

    // 判断是否有属性，来进行初始化
    if (opts.data) {
        initData(vm)
    }
    if (opts.props) {
        initProps()
    }
    if (opts.watch) {
        initWatch()
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
function initWatch() { }
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