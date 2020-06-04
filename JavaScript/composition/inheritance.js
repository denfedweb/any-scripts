class Programmer {
    constructor(name){
        this.name = name;
    }

    code(){
        console.log(`${this.name} is coding...`);
    }
}

class Frontend extends Programmer{
    angular(){
        console.log(`${this.name} is coding on Angular...`);
    }
}

class Backend extends Programmer{
    nodejs(){
        console.log(`${this.name} is coding on Node js...`);
    }
}

class Fullstack extends Programmer{
    // dublicate is not good
    // problem to extends 
    angular(){
        console.log(`${this.name} is coding on Angular...`);
    }
    nodejs(){
        console.log(`${this.name} is coding on Node js...`);
    }
}

const programmer = new Programmer('Programmer');

programmer.code();

const front = new Frontend("Frontender");

front.code();
front.angular();

const backend = new Backend("Backender");

backend.code();
backend.nodejs();