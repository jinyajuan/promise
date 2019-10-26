// 函数柯里化
// 反柯里化

/*
* 类型校验
* 1.typeof        缺点：不能校验对象、数组、null
* 2.instanceof    好处：不能判断具体类型    缺点：但是可以判断谁是谁的实例
* 3.object.prototype.toString.call()     缺点：不能判断实例
* 4.constructor   判断当前是谁构造出来的
* * */

//普通函数每次都需要传递参数，可以使用高阶函数，来绑定参数
// function checkType(value,type) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
// }
//
// console.log(checkType("hello", "String"));

//优化
function checkType(type) {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}
//当前函数可以不在当前作用域下执行，这个就叫闭包
let isString = checkType("String")
console.log(isString("zhangsan"));   //true
console.log(isString(NaN));               //false

let isNumber = checkType("Number")
console.log(isNumber(12345));      //true
console.log(isNumber(NaN));             //true

//作用域：函数定义时候产生的
//执行栈：执行上下文，js静态作用域


