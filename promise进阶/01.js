//最原始的写法，也是会引起回调地狱的写法
/*
* 需要等待第一个文件的输出结果，才能进行第二个文件的操作
* 缺点：回调地狱，不好维护，错误处理不方便
* */
const fs=require("fs")

function read(filename,encoding){
    return new Promise((resolve, reject) => {
        fs.readFile(filename,encoding,(err,data) =>{
            if (err) throw reject(err)
            resolve(data)
        })
    })
}


read("./name.txt",'utf-8').then((data)=>{
    read(data,'utf-8').then((data)=>{
        console.log(data);
    },(err)=>{
        console.log(err);
    })
},(err)=>{
    console.log(err);
})