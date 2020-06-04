const inp = document.getElementById("inp");
const count = document.getElementById("count");

const debounce = (fn, ms) => {
    let timeout;
    return function () { 
        const fnCall = () => { fn.apply(this, arguments) }

        clearTimeout(timeout);

        timeout = setTimeout(fnCall, ms);
     }
}

function onChange(e) { 
    count.innerText = +count.textContent + 1
}

onChange = debounce(onChange, 500);

inp.addEventListener('keyup', onChange); 
