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
    // 初次渲染
    get(){
        // console.log('get')
        pushTarget(this)
        this.getter()
        popTarget()
    }
    // 更新
    update(){
        // console.log('update')
        this.getter()
    }
}

export default Watcher