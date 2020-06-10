function updateState(state, action) { 
    if(action.type === 'INCREMENT'){
        return {...state, count: state.count + action.amount};
    } else if(action.type === 'DECREMENT'){
        return {...state, count: state.count - action.amount};
    } else {
        return state;
    }
 }

class Store {
    #state = null;
    #updateState = ()=> {};
    #callbacks = [];

    constructor(updateState, state){
        this.#state = state;
        this.#updateState = updateState;
        this.#callbacks = [];
    }

    update(action = {}){
        this.#state = this.#updateState(this.#state, action);
        this.#callbacks.forEach(callback => callback());
    }

    subscribe(callback){
        this.#callbacks.push(callback);
        return ()=> this.#callbacks = this.#callbacks.filter(cb => cb !== callback);
    }

    get state(){
        return this.#state
    }
}

const initialState = { count: 0 };

const store = new Store(updateState, initialState);

const incrementAction = {type: 'INCREMENT', amount: 5}
const decrementtAction = {type: 'DECREMENT', amount: 3}

const unsubscribe = store.subscribe(()=> console.log("state changed 1", store.state));
store.subscribe(()=> console.log("state changed 2", store.state));

store.update(incrementAction); 
unsubscribe();
store.update(decrementtAction); 
store.update({}); 