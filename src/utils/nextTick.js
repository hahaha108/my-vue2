let callback = []
let panding = false
function flush(){
    // console.log(callback.length)
    callback.forEach(cb => cb())
    // 还原数据
    panding = false
    callback = []
}
let timerFunc
if(Promise){
    timerFunc = () => {
        Promise.resolve().then(flush)
    }
} else if(MutationObserver) { // h5异步方法 监听dom变化，异步更新
    let observe = new MutationObserver(flush)
    let textNode = document.createTextNode(1) // 创建文本
    observe.observe(textNode,{characterData:true}) // 观测文本内容
    timerFunc = ()=>{
        textNode.textContent = 2
    }
}  else if(setImmediate){
    timerFunc = ()=>{
        setImmediate(flush)
    }
}

export function nextTick(cb){
    // console.log('nextTick')
    // console.log(cb)
    // cb()
    callback.push(cb)

    if(!panding){
        timerFunc() // 这个方法是异步方法 要处理兼容问题
        panding = true
    }
}