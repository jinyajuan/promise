// 发布订阅模式
//发布订阅模式的好处：可以解耦合
//订阅和发布是没有关系的

//发布订阅模式 和 观察者模式
/*
* 1.发布订阅模式中，发布者和订阅者没有关系
* 2.观察者模式是基于发布订阅模式的，比如vue里面的watch
* */

let fs = require("fs")

let school = {}
index = 0
x=0
let event = {
    arr: [],   //缓存列表，存放订阅者回调函数队列
    emit() {
        console.log('index:'+ (++index));
        this.arr.forEach(fn=>fn())  //发布
    },
    on(fn) {
        console.log("x:"+ (--x));
        this.arr.push(fn)   //订阅：把函数存在数组中
        console.log(this.arr);
    }
}

//订阅
event.on(function () {
    console.log("读取了一次");
})
event.on(function () {
    console.log("有读取了一次");
    if(Object.keys(school).length === 2) {
        console.log(school);
    }
})

fs.readFile("5.txt",'utf-8',function (err,data) {
    school['name'] = data
    event.emit()   //发布
})
fs.readFile('5.md','utf-8',function (err,data) {
    school['age'] = data
    event.emit()   //发布
})

