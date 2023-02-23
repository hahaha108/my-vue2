let id = 0 

// 依赖收集类
class Dep{
    constructor(){
        this.id = id++
        this.subs = [] //依赖列表
    }
    // 收集watcher
    depend(){
        // 希望watcher里面，可以存放dep（双向记忆）
        Dep.target.addDep(this)
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    // 更新watcher
    notify(){
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}

// 添加watcher
Dep.target = null
export function pushTarget(watcher){
    Dep.target = watcher
}

// 取消
export function popTarget(){
    Dep.target = null
}
export default Dep