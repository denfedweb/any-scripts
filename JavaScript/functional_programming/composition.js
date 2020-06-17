const compose = function (f1, f2) { 
    return function (value) { 
        return f1(f2(value));
     }
 }

// any funcs 
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const number = compose(Math.round, parseFloat);
number('43.45'); // 43