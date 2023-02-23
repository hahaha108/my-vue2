import { ArrayMethods } from './arr.js'
import Dep from './dep.js'
export function observer(data) {
    // console.log(data)
    if (typeof data !== 'object' || typeof data === null) {
        // 简单数据类型和null不需要劫持
        return 
    }

    // 对对象进行处理
    return new Observer(data)
}

class Observer {
    constructor(value) {
        // 把Observer绑定到劫持的对象上
        Object.defineProperty(value,'__ob__',{
            enumerable: false,
            value: this
        })
        // 给对象类型添加dep
        this.dep = new Dep()
        // 判断观测数据是数组还是对象
        if (Array.isArray(value)) {
            // 替换目标数组的原型对象，改成自己实现的劫持过的
            value.__proto__ = ArrayMethods
            // console.log(value)
            // 如果是数组对象
            this.observeArray(value)
        } else {
            this.walk(value) // 遍历
        }
    }
    // 对象的劫持
    walk(data) {
        let keys = Object.keys(data) // 获取对象中所有自有属性的key
        for (let i = 0; i <= keys.length - 1; i++) {
            // 对对象中每个属性进行劫持
            let key = keys[i]
            let value = data[key]
            // 实际劫持所用的方法
            defineReactive(data, key, value)
        }
    }
    // 数组对象的劫持
    observeArray(data) {
        for (let i = 0; i <= data.length - 1; i++) {
            observer(data[i])
        }
    }
}

// 数据劫持
function defineReactive(data, key, value) {

    let childDep = observer(value) // 递归深度劫持
    let dep = new Dep() // 给每个属性添加一个dep，来收集依赖
    Object.defineProperty(data, key, {
        get() {
            // console.log('childDep',childDep)
            // 只有在渲染阶段才收集
            if(Dep.target){
                dep.depend()
                if(childDep){
                    childDep.dep.depend()
                }
            }
            // 返回值
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            // 对新值进行数据劫持
            observer(newValue)
            // 替换新值
            value = newValue
            dep.notify()
        }
    })
}