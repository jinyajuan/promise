const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'
function resolvePromise (promise2,x,resolve,reject) {
//    x来决定promise2成功还是失败
    if(x === promise2) {
        return reject(new TypeError('TypeError:Chaining cycle detected for promise #<Promise>'))
    }
}

class Promise{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;  //表示成功的传值
        this.reason = undefined;  //表示失败的传值
        this.resolveCallback = []  //存放成功回调函数的数组
        this.rejectCallback  = []

        let resolve = (value) => {
            this.status = RESOLVE;
            this.value = value;
            this.resolveCallback.forEach(fn=>fn())
        }
        let reject = (reason) => {
            this.status = REJECT;
            this.reason = reason
            this.rejectCallback.forEach(fn=>fn())
        }
        try{
            executor(resolve,reject)
        } catch(e) {
            reject(e)
        }
    }
    /*
    * x 是当前then成功或者失败函数的返回结果
    * 如果x是一个普通值，直接传递到下一个then中
    * 如果x是一个promise，需要采用这个x的状态
    * 如果执行函数出错，直接调用promise2的失败
    * */
    then(onFulfilled,onRejected){
        let promise2 = new Promise((resolve,reject) =>{
            if(this.status === RESOLVE) {
                try{
                    setTimeout(()=>{
                        let x = onFulfilled(this.value)  //x是then成功或者失败的返回结果
                        //看x的返回结果，看一下x是不是promise，在去让promise2变成成功或者失败
                        resolvePromise(promise2,x,resolve,reject)
                        // resolve(x)
                    })
                } catch (e) {
                    reject(e)
                }
            }
            if(this.status === REJECT) {
                try{
                    setTimeout(()=>{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    })
                }catch (e) {
                    reject(e)
                }
            }
            if(this.status === PENDING) {
                this.resolveCallback.push(()=>{
                    try {
                        setTimeout(()=>{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject);  //看x的返回结果，看x是不是promise，再去让promise2变成成功或者失败
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
                this.rejectCallback.push(()=>{
                    try {
                        setTimeout(()=>{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        })
                    } catch (e) {
                        reject(e)
                    }
                    onRejected(this.reason)
                })
            }
        })
        return promise2
    }
}

module.exports = Promise