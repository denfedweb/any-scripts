// setTimeout(()=>{
//     console.log("one");
// }, 0);

// console.log("two");


function addDigits(num) {
    const x = [...num.toString()];
    
    const newNum = x.reduce((total, digit) =>{
        return total + Number(digit);
    }, 0)
    if(x.length === 1){
        return newNum;    
    }  
    return addDigits(newNum); 
}


const finalValue = addDigits(1259);
console.log(finalValue);