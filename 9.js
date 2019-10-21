const penging = 'penging'
const resolve = "resolve"
const reject = "reject"

class Promise {
    constructor(executor){
        this.state = penging;
        this.value = undefined;     //表示成功的值
        this.reason = undefined;    //表示失败的值
        this.resolveCallback = []   //存放所有then中成功的回调
        this.rejectCallback = []
        let resolveFunc = (value) => {  //value表示成功的原因
            if(this.state === penging) {
                this.state = resolve;
                this.value = value;
                this.resolveCallback.forEach((fn)=>fn())   //如果逻辑是异步的，我会让数组中的订阅的成功回调函数执行
            }
        }
        let rejectFunc = (reason) => {  //reason表示失败的原因
            if(this.state === penging) {
                this.state = reject;
                this.reason = reason;
                this.resolveCallback.forEach((fn)=>fn());  //如果逻辑是异步的，我会让数组中订阅的失败的回调函数执行
            }
        }
        try{
            executor(resolveFunc,rejectFunc)   //executor立即执行
        }catch (e) {
            rejectFunc(e)
        }
    }
    then(onfulfilled,onrejected) {
        if(this.state === resolve) {
            return onfulfilled(this.value)
        }
        if(this.state === reject) {
            return onrejected(this.reason)
        }
        if(this.state === penging) {  //executor中的逻辑可能是异步的
            //订阅成功的回调和失败的回调
            this.resolveCallback.push(()=>{
                onfulfilled(this.value)          //不想破坏原函数，还想扩展原函数
            })
            this.rejectCallback.push(()=>{
                onrejected(this.reason)
            })
        }
    }
}

module.exports = Promise