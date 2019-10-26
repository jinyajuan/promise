const Promise = require("./Promise")

/*let p = new Promise((resolve,reject) => {
    resolve(123);
    reject(456)
})*/

Promise.reject("失败").then(data1=>{
    console.log("data1",data1);
},err1=>{
    console.log("err1",err1);
}).then(data2 =>{
    console.log("data2", data2);
},err2 => {
    console.log("err2", err2);
})