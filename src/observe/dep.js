// 依赖收集类
class Dep{
    constructor(){
        this.subs = [] //依赖列表
    }
    // 收集watcher
    depend(){
        this.subs.push(Dep.target)
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