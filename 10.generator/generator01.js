const fs = require("fs").promises

function* read() {
    try {
        let fileName1 = yield fs.readFile("001.txt", "UTF-8");
        let fileName2 = yield fs.readFile(fileName1, "utf-8");
        let feeling = yield ["今天学会了generator,好开心," + fileName2];
        return feeling;
    } catch (e) {
        console.log(e);
    }
}

//it.next()返回的是一个promise
/*
let it = read()
console.log(it.next());  //{ value: Promise { <pending> }, done: false }
*/

//传统写法（不推荐）
/*let it = read();
it.next().value.then(data => {
    console.log(data);
    it.next(data).value.then(data=>{
        console.log(it.next(data).value);
    },err=>{
        it.throw(err)
    })
}, err => {
    it.throw(err)
})*/

//嵌套写法（不推荐）
/*
let it = read();
let {value,done} = it.next()
value.then(data=>{
    console.log(data);  //001.txt
    let {value,done} = it.next(data);
    value.then(data => {
        let {value,done} = it.next(data);
        console.log(value);
    },err=>{
        it.throw(err)
    })
},err=>{
    it.throw(err)
})*/

//进阶写法
//使用co库
/*
1.安装 npm install co
2.引进来该模块
3.使用
    3.1 注意点：yield后面需要跟一个对象（function, promise, generator, array, or object）
    TypeError: You may only yield a function, promise, generator, array, or object, but the following object was passed: "今天学会了generator,好开心,哈哈哈哈"

* */
/*const co = require("co")
co(read()).then(data=>{
    console.log(data);
})*/


//自己封装
function co(it) {
    return new Promise(((resolve, reject) => {
        //    异步调用，我要等待第一个next执行完成之后，再调用第二个
        function next(data) {   //异步的递归  next方法
            let {value, done} = it.next(data);
            if(done){
                resolve(value);    //最终结果抛出来
            } else {
                Promise.resolve(value).then(data=>{
                    next(data);
                },err=>{    //如果出错将错误抛出来
                    it.throw(err)
                })
            }
        }
        next();
    }))
}

co(read()).then(data => {
    console.log(data);
})