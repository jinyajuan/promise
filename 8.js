// promise
/*
* promise 有三个状态 等待态、成功态、失败态
*
* 默认现在高版本浏览器，默认支持promise
*
* promise是一个类,默认new的时候，是等待态
* 我调用了resolve  就是成功态
* 我调用了reject   就是失败态
* 返回的是一个promise实例，每个实例都有一个then方法
* */

/*
* executor 是立即执行的，如果内部报错了，就会变成失败态
* 一旦成功，就不能失败，反之亦然。
* 默认是等待状态的时候，才可以改变状态
* */

let p = new Promise((resolve, reject) => {
    console.log(1);
    resolve("发工资了")
    // throw new Error("出错了")
    reject("没钱了")
})
console.log(2);
p.then((data)=>{
    console.log("成功" , data);
},(data)=>{
    console.log('失败' , data);
})