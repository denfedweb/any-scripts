import EventEmitter from "./EventEmitter.js";

let input = document.querySelector('input[type="text"]');
let button = document.querySelector('button');
let h1 = document.querySelector('h1');

button.addEventListener('click', () => {
  emitter.emit('event:name-changed', {name: input.value});
});

let emitter = new EventEmitter();

emitter.subscribe('event:name-changed', data => {
  h1.innerHTML = `Your name is: ${data.name}`;
});

let unsubscribe = emitter.subscribe('event:name-changed', data => console.log(data));

unsubscribe();

