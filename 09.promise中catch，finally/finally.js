const Promise = require("./Promise")
let p = new Promise((resolve,reject) => {
    resolve("成功");
    // reject("失败");
})

p.then(data1=>{
    console.log("data1",data1);
    // throw new Error()
},err1=>{
    console.log("err1",err1);
}).finally(()=>{
    console.log("finally练习");
}).then(data2=>{
    console.log("data2",data2);
},err2=>{
    console.log("err2",err2);
})