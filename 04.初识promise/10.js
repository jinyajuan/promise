const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

class Promise {
    constructor (executor){
        this.state = PENDING;
        this.succ_data = undefined;  //这是成功或者失败时传的参数
        this.fail_data = undefined;
        this.resolveCallback = []
        this.rejectCallback = []

        let resolve = (succ_data) => {
            if(this.state === PENDING) {
                this.state = RESOLVE;
                this.succ_data = succ_data;
                this.resolveCallback.forEach(fn=>fn())
            }
        }
        let reject = (fail_data) => {
            if(this.state === PENDING) {
                this.state = REJECT;
                this.fail_data = fail_data;
                this.rejectCallback.forEach(fn=>fn())
            }
        }
        try{
            executor(resolve,reject)
        } catch(e) {
            reject(e)
        }

    }
    then(onFulfilled,onRejected) {
        if(this.state === RESOLVE) {
            return onFulfilled(this.succ_data)
        }
        if(this.state === REJECT) {
            return onRejected(this.fail_data)
        }
        if(this.state=== PENDING) {
            this.resolveCallback.push(()=>{
                onFulfilled(this.succ_data)
            })
            this.rejectCallback.push(()=>{
                onRejected(this.fail_data)
            })
        }
    }
}

let p = new Promise(function (resolve,reject) {
    setTimeout(function () {
        resolve("有钱啦");
    },100)
    setTimeout(function () {
        reject("没钱啦")
    },100)
    // throw new Error()
})
p.then((succ_data)=>{
    console.log(succ_data, "成功");
},(fail_data)=>{
    console.log(fail_data, "失败");
})