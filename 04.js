//对3.js的扩展

/*
eg01:
function checkType(type,value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

let isString = curring(checkType)("String")
isString("hello")
*/

// eg02:
/*
function add(a,b,c,d,e) {
    return a+b+c+d+e;
}

//如何实现函数的柯里化
function curring(fn,arr = []) {   //函数的参数就是  可以通过length来取到形参的个数
    console.log("fn:"+fn);
    console.log("fn.length:"+fn.length);
    console.log("arr:"+arr);
    console.log("arr.length:"+arr.length);
    console.log("---------------------------------");
    // console.log(fn.length);    //5
    let len = fn.length    //获取当前函数的参数
    return function (...args) {
        arr = [...arr,...args]
        if(arr.length < len) {  //传入的参数不够执行
            return curring(fn,arr)   //递归 如果数量不顾，不停的返回函数，继续接受参数
        }else{
            return fn(...arr)
        }
    }
}

let r1 = curring(add)(1)(2,3)
console.log(r1);   //[Function]

let r2 = curring(add)(1)(2,3)(4,5)
console.log(r2);   //15

let r3 = curring(add)(1)(2,3)(4,5,6,7,8)
console.log(r3);   //15

*/

// eg03:
/*function checkType(type,value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

let isString = curring(checkType)("String")
console.log(isString("hello"));

function curring(fn,arr = []) {   //函数的参数就是  可以通过length来取到形参的个数
    console.log("fn"+fn);
    console.log(fn.length);
    console.log("arr"+arr);
    console.log(arr.length);
    // console.log(fn.length);    //5
    let len = fn.length    //获取当前函数的参数
    return function (...args) {
        arr = [...arr,...args]
        if(arr.length < len) {  //传入的参数不够执行
            return curring(fn,arr)   //递归 如果数量不顾，不停的返回函数，继续接受参数
        }else{
            return fn(...arr)
        }
    }
}*/

//eg04:
/*
function checkType(type,value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}
let util = {}
let types = ['String','Number','Boolean','Null','Object','Undefined']
types.forEach(type => {
    util[`is${type}`] = curring(checkType)(type)
})

console.log(util);
console.log(util.isString("hello"));
console.log(util.isNumber("hello"));
console.log(util.isObject({}));

// console.log(curring(checkType)("String")("hello"));

function curring(fn,arr = []) {
    let len = fn.length
    return function (...args) {
        arr = [...arr,...args]
        if(arr.length < len) {
            return curring(fn,arr)
        } else {
            return fn(...arr);
        }
    }

}
*/


//eg05:
/*
* 反柯里化
*   1.柯里化就是把函数变得更加细小
*   2.反柯里化  是让函数的方法变得更加通用一些（扩大）
*
* */