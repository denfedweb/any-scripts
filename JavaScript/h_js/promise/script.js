new Promise(function(resolve, reject) {
    setTimeout(()=>{
        resolve();
    }, 2000);
}).then( async ()=>{
    console.log("first then")
    return await new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve("return then");
            
        }, 2000)
    })
}).then((res)=>{
    console.log(res)
})

