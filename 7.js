//观察者模式
//有一个观察者 和 被观察者

class Subject {  //被观察者
    constructor(){
        this.arr = []   //观察者的实例
        this.state = '开心'
    }
    attach(m) {   //挂载观察者
        this.arr.push(m)
    }
    setState(newState) {
        this.state = newState
        this.arr.forEach(m=>m.updated(this))
        console.log(this)
    }
}

class Observe {  //观察者
    constructor (name){
        this.name = name
    }
    updated(o){   //当前被观察者的状态发生了变化，需要更新状态了
        console.log(o.state+"对"+this.name);
    }
}

let o =new Subject("小宝宝")
let m1 = new Observe("爸爸")
let m2 = new Observe("妈妈")
o.attach(m1)
o.attach(m2)
o.setState('不开心')

//1.将观察者放到被观察者之上
//2.我家有个姑娘，状态是"开心"
//3.爸爸和妈妈
//4.状态变化了——> 告诉观察者  （发布订阅）

