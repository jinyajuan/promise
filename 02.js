// setState 事务  是同步还是异步
function perform(callback,arr){
    return function () {
        arr.forEach(wrapper=>wrapper.initialize())
        callback()
        arr.forEach(wrapper=>wrapper.close())
    }
}

let newFunc = perform(function () {
    console.log("普通函数  核心功能");
}, [
    {
        initialize(){
            console.log("wrapper1 start");
        },
        close(){
            console.log("close1");
        }
    },
    {
        initialize(){
            console.log("wrapper2 start");
        },
        close(){
            console.log("close2");
        }
    }
])

newFunc()