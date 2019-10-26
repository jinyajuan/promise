function *read() {
    yield 1;
    yield 2;
}
function *read_1() {
    yield *read()
    yield 3;
    yield 4;
}

let it = read_1()
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

//在一个generator中使用另外一个generator执行器，需要加上yield *