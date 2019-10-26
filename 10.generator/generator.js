/*
* 1.generator 是生成器
* 2.generator,async/await都是基于promise
* */

function *read() {    //generator生成的是迭代器
    try {
        let a = yield 'node.js';
        console.log(a);
        let b = yield "javascript";
        console.log(b);
    } catch (e) {
        console.log(e);
    }
}

let it = read()   //迭代器
console.log(it.next());   //第一册的next参数是没有意义的
console.log(it.next("hello"));    //之后的next的参数，会作为上一次的返回值
console.log(it.next());
