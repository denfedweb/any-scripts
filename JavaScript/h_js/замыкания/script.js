function createCalcFunc(n){
    n = n / 2;
    return function(x){
        return x * Number(n)
    }
}

// output 50
console.log(createCalcFunc(10)(10));

function urlGenerator(domain){
    return function(url){
        return `https://${url}.${domain}`;
    }
}

const newUrl = urlGenerator("com");

// output https://google.com
console.log(newUrl("google"));

// bind
function bind(context, fn){
    return function(...args){
        fn.apply(context, args);
    }
}

function binded(){
    console.log(this);
}

document.querySelector("button").addEventListener("click", function(){
    bind(this, binded)();
    binded();
})
