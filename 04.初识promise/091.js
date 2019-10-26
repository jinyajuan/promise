//调用9.js中手写的promise
let promise = require('./09')

let p = new Promise((resolve, reject) => {
    console.log(1);
    // throw new Error()
    resolve("发工资啦")
    reject("一毛钱都没有啦")
})

console.log(2);

/*
* 成功的回调函数：fn1-1，fn2-1
* 失败的回调函数：fn1-2，fn2-2
* */

p.then((data)=>{  //fn1-1
    console.log("成功", data);
},(respon)=>{  //fn1-2
    console.log("失败", respon);
})

p.then((data)=>{  //fn2-1
    console.log("成功", data);
},(respon)=>{   //fn2-2
    console.log("失败", respon);
})