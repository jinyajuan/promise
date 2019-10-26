//面试题1
/*
let p = new Promise(((resolve, reject) => {
    reject();
    resolve();
}))

p.then(()=>{
    console.log('成功');
},()=>{
    console.log("失败");
})

//答案：失败*/

//面试题2
/*
const promise = new Promise(((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);

}))
promise.then(() => {
    console.log(3);
})

//答案：1,2,3
//原因：then里面有异步，会等待new Promise里面的执行完成之后再执行，new Promise里面的代码是同步
*/

//面试题3
/*
Promise.resolve(1)
    .then(res => 2)
    .catch(err => 3)
    .then(res => console.log(res))

//答案：2
*/

//面试题4
Promise.resolve(1)
    .then(x => x + 1)
    .then(x => {
        throw new Error('My Error')
    })
    .catch(() => 1)
    .then(x => x + 1)
    .then(x => console.log(x))
    .catch(console.err)

//答案：2