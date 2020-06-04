const peoples = [
    {name: 'John', age: 30, gender: 'Female'},
    {name: 'Gena', age: 15, gender: 'Male'},
    {name: 'Jane', age: 24, gender: 'Male'},
    {name: 'Tom', age: 16, gender: 'Female'},
    {name: 'Adam', age: 24, gender: 'Male'},
    {name: 'Bob', age: 17, gender: 'Female'},
    {name: 'Liuda', age: 60, gender: 'Male'}
];

// forEach
peoples.forEach(person => {
    person.age -= 1;
});
console.log(peoples);

// map
const newPeople = peoples.map(person => {
    return `${person.name} (${person.age})`;
})
console.log(newPeople);

// filter
const adults = peoples.filter((person)=> {
    if(person.age >= 18){
       return true
    }
});
console.log(adults);

// reduce
const greatAge = peoples.reduce((total, person)=>{
    return Math.max(total, person.age);
}, 0);
console.log(greatAge);

// find
const oldMan = peoples.find((person)=>person.age === greatAge);
console.log(oldMan);

// findIndex
const oldManIdx = peoples.findIndex((person)=>person.age === greatAge);
console.log(oldManIdx);
