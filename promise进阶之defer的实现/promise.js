const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

function resolvePromise(promise2, x, resolve, reject) {
//    x来决定promise2成功还是失败
    if (x === promise2) {
        return reject(new TypeError('TypeError:Chaining cycle detected for promise #<Promise>'))
    }
    // 怎么样判断x是不是promise？
    //判断x是不是一个promise，如果x是常量，就直接用结果将promise2成功调即可
    let called;   //用来保证不会多次走成功或者失败
    if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
        //    有可能是promise
        //    {}.then  x有可能定义了then方法，使用的是object.defineProperty
        try {
            let then = x.then;   //取then可能会发生异常
            if (typeof then === 'function') {
                //    认为这就是一个promise
                then.call(x, y => {  //用刚才取出来的then方法继续使用，不要再次使用then方法取值了
                    if (called) return;   //调用成功之后，就不能再调用失败
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)   //递归解析当前x的promise的解析结果，因为promise成功之后可能返回的还是一个promise
                    // resolve(y)
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {  //then就是一个普通值
                resolve(x)
            }
        } catch (e) {
            if (called) return;  //如果调用了失败，就把值改成true,如果再次调用，就把值屏蔽掉，主要是防止多次被调用
            called = true;
            reject(e);
        }
    } else {  //普通的字符串 number bool
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;  //表示成功的传值
        this.reason = undefined;  //表示失败的传值
        this.resolveCallback = []  //存放成功回调函数的数组
        this.rejectCallback = []

        let resolve = (value) => {
            this.status = RESOLVE;
            this.value = value;
            this.resolveCallback.forEach(fn => fn())
        }
        let reject = (reason) => {
            this.status = REJECT;
            this.reason = reason
            this.rejectCallback.forEach(fn => fn())
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    /*
    * x 是当前then成功或者失败函数的返回结果
    * 如果x是一个普通值，直接传递到下一个then中
    * 如果x是一个promise，需要采用这个x的状态
    * 如果执行函数出错，直接调用promise2的失败
    * */
    then(onFulfilled, onRejected) {
        console.log(typeof onFulfilled);
        console.log(typeof onRejected);
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === "function" ? onRejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVE) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)  //x是then成功或者失败的返回结果
                        //看x的返回结果，看一下x是不是promise，在去让promise2变成成功或者失败
                        resolvePromise(promise2, x, resolve, reject)
                        // resolve(x)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === REJECT) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                        // resolve(x)
                    } catch (e) {
                        reject(e)
                    }

                })
            }
            if (this.status === PENDING) {
                this.resolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject);  //看x的返回结果，看x是不是promise，再去让promise2变成成功或者失败
                            // resolve(x)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.rejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                            // resolve(x)
                        } catch (e) {
                            reject(e)
                        }

                    })
                })
            }
        })
        return promise2
    }
}

//必须测试前 要加这一段代码
//这个是帮助我们测试的包
//测试前，要加这一段代码，可以看做测试的入口
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = Promise