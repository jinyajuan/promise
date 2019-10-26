const Promise = require('./promise')
const fs = require("fs")
//原始写法
/*
function read(fileName,encode = "utf-8"){
    return new Promise(((resolve, reject) => {
        fs.readFile(fileName,encode,(err,data)=>{
            if(err) throw reject(err)
            resolve(data)
        })
    }))
}


read("./file/001.txt").then((data)=>{
    console.log("data1",JSON.parse(data).content);
    // return read(JSON.parse(data).name)
},(err)=>{
    console.log("err1",err);
}).then((data)=>{
    console.log("data2",JSON.parse(data).content);
    console.log("data2",data);
},(err)=>{
    console.log("err2",err);
})

*/

//延迟对象
//defer的实现就是这样实现的
/*function read(fileName,encode = "utf-8") {
    let defer = Promise.defer();
    fs.readFile(fileName,encode,(err,data)=>{
        if(err){
            defer.reject(err)
        } else{
            defer.resolve(data)
        }
    })
    return defer.promise;
}

read('./file/001.txt').then(data=>{
    console.log(JSON.parse(data).content);
    return read(JSON.parse(data).name)
},err=>{
    console.log(err);
}).then(data=>{
    console.log(JSON.parse(data).content);
},err=>{
    console.log(err);
})*/

//resolve中如果放了一个Promise 那么会等到这个Promise执行完成
/*let p = new Promise((resolve,reject) =>{
    resolve(new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve("hello")
        })
    }))
})
p.then(data=>{
    console.log(data,"成功");
},err=>{
    console.log(err,"失败");
})*/


