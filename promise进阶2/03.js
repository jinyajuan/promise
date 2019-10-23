const Promise = require("./promise")

let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("呵呵")
    })
})