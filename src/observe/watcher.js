import { pushTarget,popTarget } from "./dep"

let id = 0
class Watcher{
    constructor(vm,updateComponent,cb,options){
        this.vm = vm
        this.updateComponent = updateComponent
        this.cb = cb
        this.options = options
        this.deps = [] // 存放dep实例的
        this.depsId = new Set()

        // 给每个watcher实例不同的编号
        this.id = id++
        // 判断
        if (typeof updateComponent === 'function'){
            this.getter = updateComponent // 用来更新视图
        }

        // 更新视图
        this.get()
    }
    addDep(dep){
        // 1.去重
        let id = dep.id
        if (!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }
    run(){
        // console.log('run')
        this.getter()
    }
    // 初次渲染
    get(){
        // console.log('get')
        pushTarget(this)
        this.getter()
        popTarget()
    }
    // 更新
    update(){
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
function queueWatcher(watcher){
    let id = watcher.id //每个组件都是同一个watcher
    if(!has[id]){
        // 如果没有执行过
        queue.push(watcher)
        has[id] = true
        if(!panding){
            setTimeout(()=>{
                queue.forEach(watcher => {watcher.run()})
                queue = []
                has = {}
                panding = false
            },0)
        }
        panding = true
       
    }
}

export default Watcher