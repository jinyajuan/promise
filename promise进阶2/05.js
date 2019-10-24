const Promise = require("./promise")

let p = new Promise((resolve,reject) => {
    setTimeout(()=>{
        reject("呵呵")
    },100)
})

p.then(null,(err1)=>{
    console.log(err1, "失败1");
    // return 123;
    throw err1
}).then((data2)=>{
    console.log(data2,"成功2");
    throw data2
},(err2)=>{
    console.log(err2,"失败2");
    throw err2
}).then((data3)=>{
    console.log(data3,"成功3");
},(err3)=>{
   // console.log(typeof err);   //string，上一次传入的值是常数类型，所以需要对promise的then方法中的毁掉函数进行判断
    console.log(err3,"失败3");
})
