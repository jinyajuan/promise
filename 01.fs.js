//  异步编程  高阶函数

/*
 什么是高阶函数？
    1.将一个函数作为另一个函数的参数传入
    2.如果一个函数，返回另一个新的函数，那个这个函数就是高阶函数
*/

/*
* 高阶函数的解决的问题
*
* */

/*
* 装饰模式 AOP切片
* */

Function.prototype.before = function(func) {
    console.log(this)
    // 箭头函数中没有arguments
    // ...剩余运算符 把所有的内容，都变成一个数组
    return (...args) =>{   //this箭头函数中，没有this指向，this会指向上一层查找
        func();
        this(...args)  //将数组全部展开传入
    } 
}

function makeCoffee (...args) {
    console.log("创建一杯咖啡"+args);
}
// this表示  谁调用次函数，this就是谁
let newFunc = makeCoffee.before(function () {
    console.log("加糖");
})

let newFunc1 = makeCoffee.before(function () {
    console.log("加奶");
})

newFunc("老板","员工","客户")
newFunc1()
