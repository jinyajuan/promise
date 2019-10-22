const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'
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
    * x是不是一个普通值，如果是普通值，直接传递到下一个then中
    * 如果x是一个promise？我需要采用这个x的状态
    * 如果执行函数出错，直接调用promise2的失败
    * */
    then(onFulfilled,onRejected){
        let promise2 = new Promise((resolve,reject) =>{
            if(this.status === RESOLVE) {
                try{
                    let x = onFulfilled(this.value)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }
        })

        if(this.status === REJECT) {
            onRejected(this.reason)
        }
        if(this.status === PENDING) {
            this.resolveCallback.push(()=>{
                onFulfilled(this.value)
            })
            this.rejectCallback.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise