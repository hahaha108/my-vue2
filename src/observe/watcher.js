import { pushTarget,popTarget } from "./dep"

let id = 0
class Watcher{
    constructor(vm,updateComponent,cb,options){
        this.vm = vm
        this.updateComponent = updateComponent
        this.cb = cb
        this.options = options

        // 给每个watcher实例不同的编号
        this.id = id++
        // 判断
        if (typeof updateComponent === 'function'){
            this.getter = updateComponent // 用来更新视图
        }

        // 更新视图
        this.get()
    }
    // 初次渲染
    get(){
        pushTarget(this)
        this.getter()
        popTarget()
    }
    // 更新
    update(){
        this.getter()
    }
}

export default Watcher