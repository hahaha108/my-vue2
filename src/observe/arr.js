// 重写数组方法

// 获取原来数组的方法
let oldArrayProtoMethods = Array.prototype
// 继承
export let ArrayMethods = Object.create(oldArrayProtoMethods)

// 劫持数组方法
let methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice'
]

methods.forEach(item => {
    ArrayMethods[item] = function(...args){
        // console.log('array 方法劫持')
        
        let result = oldArrayProtoMethods[item].apply(this,args)
        let inserted
        switch(item){
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        
        let ob = this.__ob__
        if(inserted){
            // 对添加的对象进行劫持
            // console.log(' ob.observeArray(inserted)')
            ob.observeArray(inserted)
        }
        ob.dep.notify()

        return result
    }
})