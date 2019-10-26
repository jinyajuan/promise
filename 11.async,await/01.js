const fs = require("fs").promises

async function read() {   //async函数的执行结果就是promise
    try {
        let fileName1 = await fs.readFile('./00c1.txt', 'utf-8');
        let fileName2 = await fs.readFile(fileName1, 'utf-8');
        return fileName2;
    } catch (e) {
        throw new Error(e)
    }
}

read().then(data => {
    console.log("成功" + data);
}, err => {
    console.log("失败" + err);
})

/*
* async，await的使用会阻塞
* 
* */



