const promise = require("./promise")

let p = new Promise((resolve, reject) => {
    resolve("成功")
})

p.then((data)=>{
    console.log("哈哈哈",data);
},()=>{}).then(()=>{
    console.log("123");
    throw new Error()
},()=>{

}).then(()=>{

},(err)=>{
    console.log(err);
})