/*
* 1.先将fs的读取方法，变成promise的模式
* */

const fs = require("fs")
const Promise = require("./Promise")

function read(fileName, encoding = "UTF-8") {
    return new Promise((resolve,reject) => {
        fs.readFile(fileName, encoding, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })

}

// 都成功才算成功，有一个失败就算失败
//all是静态方法,(所谓静态方法实际上就是可以通过类直接调用的方法)
/*Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let arr = []
        let index = 0;
        for (let i = 0; i < promises.length; i++) {
            let value = promises[i];
            let processDate = function (i, y) {
                arr[i] = y;
                if(++index === promises.length) {
                    resolve(arr)
                }
            }
            if (isPromise(value)) {
                value.then(y => {
                    processDate(i, y)
                }, reject)
            } else {
                processDate(i, value)
            }
        }
    })
}*/
/*
function isPromise(value) {
    if ((typeof value === "object" && value !== null) || (typeof value === 'function')) {
        return true;
    } else {
        return false;
    }
}
*/


Promise.all([5,read('./file/001.txt' ),read('./file/002.txt'),100]).then(data => {
    console.log(data);
})

//原来的写法
/*
read("./file/001.txt").then(data => {
    console.log(JSON.parse(data).content);
}, err => {
    console.log(err);
})

read("./file/002.txt").then(data=>{
    console.log(JSON.parse(data).content);
},err=>{
    console.log(err);
})*/
