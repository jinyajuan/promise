const promise = require("./promise")
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
}).then((data)=>{
    console.log(JSON.parse(data).content);
},(err)=>{
    console.log(err);
})