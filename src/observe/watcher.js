import { pushTarget, popTarget } from "./dep"
import { nextTick } from "../utils/nextTick"
let id = 0
class Watcher {
    constructor(vm, expOrfn, cb, options) {
        this.vm = vm
        this.expOrfn = expOrfn
        this.cb = cb
        this.options = options
        this.deps = [] // 存放dep实例的
        this.depsId = new Set()
        this.user = !!options.user

        // 给每个watcher实例不同的编号
        this.id = id++
        // 判断
        if (typeof expOrfn === 'function') {
            this.getter = expOrfn // 用来更新视图
        } else {
            this.getter = function () {
                // c.c.c
                let path = expOrfn.split('.')
                let obj = vm
                for (let i = 0; i < path.length; i++) {
                    obj = obj[path[i]]
                }
                return obj

            }
        }

        // 更新视图
        this.value = this.get() // 保存watch的初始值
    }
    addDep(dep) {
        // 1.去重
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }
    run() {
        // console.log('run')
        let value = this.get() // 新值
        let oldValue = this.value
        this.value = value
        if (this.user) {
            this.cb.call(this.vm, value, oldValue)
        }
    }
    // 初次渲染
    get() {
        // console.log('get')
        pushTarget(this)
        const value = this.getter()
        popTarget()
        return value
    }
    // 更新
    update() {
        // 不要数据更新后每次都调用getter方法
        // 暂存
        queueWatcher(this)
        // console.log('update')
        // this.getter()
    }
}

let queue = [] //队列，把需要排列更新的watcher存放到queue中
let has = {}
let panding = false
function flushWatcher() {
    // console.log(queue)
    queue.forEach(watcher => { watcher.run(); if (!watcher.user) watcher.cb() })
    queue = []
    has = {}
    panding = false
}
function queueWatcher(watcher) {
    let id = watcher.id //每个组件都是同一个watcher
    if (!has[id]) {
        // 如果没有执行过
        queue.push(watcher)
        has[id] = true
        if (!panding) {
            // setTimeout(()=>{
            //     queue.forEach(watcher => {watcher.run()})
            //     queue = []
            //     has = {}
            //     panding = false
            // },0)
            nextTick(flushWatcher) // nextTick相对于定时器
        }
        panding = true

    }
}

export default Watcher