class Watcher{
    constructor(vm,updateComponent,cb,options){
        this.vm = vm
        this.updateComponent = updateComponent
        this.cb = cb
        this.options = options
        // 判断
        if (typeof updateComponent === 'function'){
            this.getter = updateComponent // 用来更新视图
        }

        // 更新视图
        this.get()
    }
    get(){
        this.getter()
    }
}

export default Watcher