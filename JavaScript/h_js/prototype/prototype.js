const person = {
    name: 'John',
    age: 30,
    greet: function(){
        console.log("greet");
    }
};

const person2 = new Object({
    name: 'John',
    age: 30,
    greet: function(){
        console.log("greet")
    }
});

Object.prototype.sayHello = function(){
    console.log("hello");
}

const person3 = Object.create(person);

