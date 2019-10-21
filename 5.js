//解决异步加载之后统计的问题
/*
const fs = require('fs')

var school = []

//计数器的方式
var index = 0
function out(){
    index++;
    if(index === 2) {
        console.log(school);
    }
}

fs.readFile('5.txt','utf-8',function (err,data) {
    school.push(data);
    out();
})

fs.readFile("5.md",'utf-8',function (err,data) {
    school.push(data);
    out();
})
*/

//第二种方式
const fs = require("fs")
var school = []

function after(time,callback) {   //高阶函数
    return function () {
        if(--time === 0) {
            callback()
        }
    }
}
let out = after(2,function () {  //将数量内置到after函数中，闭包 Promise.all
    console.log(school);
})

fs.readFile("5.txt","utf-8",function (err,data) {
    school.push(data);
    out();
})

fs.readFile("5.md","utf-8",function (err,data) {
    school.push(data);
    out();
})
