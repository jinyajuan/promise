//优化
let fs = require("fs")

function read(fileName,encoding){
    return new Promise((resolve, reject) => {
        fs.readFile(fileName,encoding,(err,data)=>{
            if(err) reject(err);
            // resolve(data)
            reject(data)
        })
    })
}
/*
* 1.如果then成功或者失败的结果中，返回的还是一个一个promise，会等待这个promise的执行结果，并将结果像外层的then传递
* 2.如果then方法（成功方法、失败方法）抛出异常的时候，会走下一次的then的失败
* 3.走失败有两种情况：（1）返回一个失败的promise；（2）抛出异常
* */
read("./name.txt",'utf-8').then((data)=>{
    return read(data,'utf-8')
},(err)=>{
    console.log('err1',err);
    return new Promise(()=>{})
    throw err;    //如果第一次走的失败，没有返回值，也会走到下一次的成功里面去
    /*
    * 如果第一次走的失败，没有返回值，也会走到下一次的成功里面去，第一次成功与否和第二次没有关系
    * 正常情况下从第一次到第二次的状态如下：
    * 成功->成功  成功->失败  失败->成功
    * 如果非要实现"失败->失败"的状态变化，可以参考满足下述这两个条件之一即可,一般直接抛出异常就可以了
    *   （1）返回一个失败的promise；（2）抛出异常
    *
    * 面试题：如果走完失败之后就终止promise，需要怎么样操作？
    * 答:返回一个不成功也不失败的promise 就可以终止链的调用
    * 也就是说，在终止的条件最后一行写上 return new Promise(()=>{})
    * */
}).then((data)=>{
    console.log("data2",data);
},(err)=>{
    console.log('err2',err);
})