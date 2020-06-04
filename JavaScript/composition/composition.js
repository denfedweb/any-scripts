function createProgrammer(name){
    const programmer = {name}
    return {
        ...programmer,
        ...canCode(programmer)
    }
}

function canCode ({name}) { 
    return {
        code: ()=> console.log(`${name} is coding...`)
    }
}

function canAngular ({name}) { 
    return {
        angular: ()=> console.log(`${name} is coding on Angular...`)
    }
}

function canNodejs ({name}) { 
    return {
        node: ()=> console.log(`${name} is coding on Node js...`)
    }
}

function createFrontender(name){
    const programmer = createProgrammer(name);

    return {
        ...programmer,
        ...canAngular(programmer)

    }
}

function createBackender(name){
    const programmer = createProgrammer(name);

    return {
        ...programmer,
        ...canNodejs(programmer)

    }
}

function createFullstack(name){
    const programmer = createProgrammer(name);

    return {
        ...programmer,
        ...canNodejs(programmer),
        ...canAngular(programmer)

    }
}

const programmer = createProgrammer('Programmer')
programmer.code();

const front = createFrontender('Frontender');
front.code();
front.angular();

const back = createBackender('Backender');
back.code();
back.node();

const full = createFullstack("Pro");
full.code();
full.node();
full.angular();