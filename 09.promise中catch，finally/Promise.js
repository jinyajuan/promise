const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('TypeError:Chaining cycle detected for promise #<Promise>'))
    }
    let called;
    if ((typeof x === 'object' && x !== null) || (typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x)
    }
}

function isPromise(value) {
    if ((typeof value === 'object' && value !== null) || (typeof value === 'function')) {
        return true;
    } else {
        return false
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallback = [];
        this.rejectCallback = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVE;
                this.value = value;
                this.resolveCallback.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECT;
                this.reason = reason;
                this.rejectCallback.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
        onRejected = typeof onRejected === "function" ? onRejected : err => {
            throw err
        };
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVE) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
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
                            setTimeout(() => {
                                resolvePromise(promise2, x, resolve, reject)
                            })
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.rejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            setTimeout(() => {
                                resolvePromise(promise2, x, resolve, reject)
                            })
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2
    }

    catch(errCallback) {    //catch实际意义上就是then，不会有终止后续then执行的功能
        return this.then(null, errCallback)
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    finally(callback) {
        // let P = this.constructor
        return this.then(
            value => this.resolve(callback()).then(() => value),
            reason => this.resolve(callback()).then(() => {
                throw reason
            })
        )
    }

    static all (promises) {
        return new Promise((resolve, reject) => {
            let arr = [];
            let index = 0;
            for (let i = 0; i < promises.length; i++) {
                let value = promises[i];
                let processDate = function (i, y) {
                    arr[i] = y;
                    if (++index === promises.length) {
                        resolve(arr);
                    }
                }
                if (isPromise(value)) {
                    value.then(y => {
                        processDate(i, y)
                    }, reject)
                } else {
                    processDate(i, value)
                }
            }
        })
    }
}

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = Promise