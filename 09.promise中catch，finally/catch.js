const Promise = require("./Promise")

let p = new Promise((resolve,reject) => {
    resolve("哈哈哈哈");
    reject("呜呜呜呜")
})
p.then(data1=>{
    console.log("data1",data1);
},err1=>{
    console.log("err1",err1);
    // throw err1;
}).catch(err2=>{    //catch实际意义上就是then，不会有终止后续then执行的功能
    console.log("err2",err2);
}).then(data3=>{
    console.log("data3",data3);
},null)