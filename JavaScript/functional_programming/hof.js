// es5
function hof(a) { 
    return function(b){
        return a + b;
    }
 }

hof(1)(2); // 3

// es6 
const hof = (a) => (b) => a + b;

hof(1)(2); // 3

// es5
function hof(fn) { 
    return function (arg) { 
        return fn(arg);
     }
 }

hof(function (num) { 
    return num + 5;
 })(5); // 10 

// es6
const hof = (fn) => (arg) => fn(arg);
hof((num)=> num + 5)(5) // 10

// ///////// 
const myFn = (...args) => args;
const partialFn = myFn.bind(null, 1, 2, 3);
partialFn(4, 5); // 1, 2, 3, 4, 5

///////
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest);
const sum = (a, b) => a + b;
partial(sum, 1)(2) // 3

// obj
const myObj = {
    name: "username",
    getMessage(action, status){
        return `${this.name} has been ${action} ${status}`;
    }
}

myObj.getMessage("logger", "success");
// username has been logger success

partial(myObj.getMessage("logger")("success"));
// *UNDEFINED* has been logger success

myObj.getMessage.bind(myObj ,"logger")("success");
// username has been logger success