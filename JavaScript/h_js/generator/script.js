function* strGenerator() { 
    yield "H"
    yield "e"
    yield "l"
    yield "l"
    yield "o"
 }

 const str = strGenerator();
//  str.next(); str.next().value; str.next().done; get value  

function* numberGen(n = 10) { 
    for(let i = 0; i < n; i++){
        yield i
    }
 }

const number = numberGen(7);
// number.next()

// generator logic
const iterator = {
    gen(n = 10){
        let i = 0;

        return {
            next(){
                if(i < n){
                    return {
                        value: ++i, 
                        done: false
                    }
                }
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}


// symbol iterator
function* iter(n = 10) { 
    for(let i = 0; i < n; i++){
        yield i
    }
 }

for(let k of iter(6)){
    console.log(k);
}