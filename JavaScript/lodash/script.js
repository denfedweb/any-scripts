// * chunk
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

// * my chunk 
function chunk(arr, idx, endarr) { 
    var newArr = [];
    var endArr = endarr || [];

    for(let i = 0; arr.length > i; i++){
        if(i < idx){
            newArr.push(arr[i]);
        }
    }
    arr.splice(0, idx);
    endArr.push(newArr);
    if(arr.length !== 0){
        chunk(arr, idx, endArr);
    }

    return endArr
 }
 
// console.log(chunk(["fds", "dsf", "fdsf", "sdf"], 2)); 

// * compact
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]

// * my compact
function compact(arr) { 
    let newArr = []
    arr.forEach(el =>{
        if(el){
           newArr.push(el); 
        }
    })
    return newArr
 }

// console.log(compact([0, 1, false, 2, '', 3])); 

// * concat
var array = [1];
var other = _.concat(array, 2, [3], [[4, 6]]);

// console.log(other);
// => [1, 2, 3, [4]]
 
// console.log(array);
// => [1]

// * my concat
var arrayConcat = [1, 6];

function iter(el){
    let newArr = [];
    if (typeof el === 'object'){
        el.forEach(x => {
            newArr.push(x);
        });
    } else {
        newArr.push(el);
    }
    return newArr;
}

function concat(...variables){
    let newArr = [];
    
    variables.forEach(el => {
        newArr = [...newArr, ...iter(el)]
    });

    return newArr
}

// console.log(concat(arrayConcat, 2, [3], [[4]]))
