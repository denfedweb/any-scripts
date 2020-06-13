let activeEffect;

function watchEffect(fn) { 
    activeEffect = fn;
    fn();
    activeEffect = null;
}

class Dependecy{
    constructor(){
        this.subscribers = new Set();
    }

    depend(){
        if(activeEffect){
            this.subscribers.add(activeEffect)
        }
    }

    notify(){
        this.subscribers.forEach(sub => sub());
    }
}

function reactive(obj) { 
    Object.keys(obj).forEach(key => {
        const dep = new Dependecy();
        let value = obj[key];

        Object.defineProperty(obj, key, {
            get(){
                dep.depend();
                return value;
            },
            set(newValue){
                if(newValue !== value){
                    value = newValue;
                    dep.notify();
                }
            }
        });
    });

    return obj;
}
