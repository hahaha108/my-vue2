import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js', // 打包的入口文件
    output: {
        file: 'dist/vue.js', // 打包出口文件
        format: 'umd', // 在window上挂载Vue，可以直接 new Vue()
        name: 'Vue',
        sourcemap: true // 打包后的代码和源码映射，方便调试 
    },
    plugins: [
        // 把高级语法转换成低级语法
        babel({
            exclude: 'node_modules/**' //排除 node_modules 下的所有文件
        }), 
        // 开启一个开发服务器
        serve({
            port: 3000, // 端口号
            contentBase: '', // 在当前目录
            openPage: '/index.html' // 入口页面
        }) 

    ]

}