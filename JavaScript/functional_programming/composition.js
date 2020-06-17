const compose = function (f1, f2) { 
    return function (value) { 
        return f1(f2(value));
     }
 }

// any funcs 
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const number = compose(Math.round, parseFloat);
number('43.45'); // 43

// //////////////////////

const composeAsyncFunctions = (...fns) => arg =>
  fns.reduce((p, fn) => p.then(fn), Promise.resolve(arg));

// Пример:

const sum = composeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);

(async () => {
  console.log(await sum(2)); // 12 (Через одну секунду)
})();