const Promise = require("./promise")
const fs = require("fs")

function read(filename,encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename,encoding,(err,data)=>{
            if(err) reject(err);
            resolve(data)
        })
    })
}


read("./file/001.txt",'utf-8').then((data)=>{
    console.log(JSON.parse(data).content);
    return read(`${JSON.parse(data).name}`,'utf-8')
},(err)=>{
    console.log(err);
}).then((data1)=>{
    console.log(JSON.parse(data1).content);
},(err)=>{
    console.log(err);
})

function readNum(num) {
    return new Promise((resolve,reject)=>{
        if(num<=3) {
            resolve(num)
        } else {
            reject(num)
        }
    })
}

/*
例子2
let p1 = readNum(2).then((data)=>{
    console.log(data,"abc");
    return readNum(12)
},(err)=>{
    console.log(err,"ABC");
})
p1.then((data1)=>{
    console.log(data1,"def");
},(err1)=>{
    console.log(err1,"DEF");
})*/
