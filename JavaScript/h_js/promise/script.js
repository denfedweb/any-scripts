new Promise(function(resolve, reject) {
    setTimeout(()=>{
        resolve();
    }, 2000);
}).then(()=>{
    // ожидаем выполнение первого промиса, и выводим в консоль 
    console.log("First Promise Resolved!");
    // возвращаем новый промис
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            // промис возвращает текст
            resolve("Second Promise Resolved!");
        }, 2000);
    })
}).then((res)=>{
    // ожидаем выполнение предыдущего then'a, и выводим в консоль его ответ
    console.log(res);
});

