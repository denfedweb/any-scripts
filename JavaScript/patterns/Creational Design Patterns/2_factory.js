class SimpleMembership{
    constructor(name){
        this.name = name;
        this.cost = 50;
    }
}

class StandardMembership{
    constructor(name){
        this.name = name;
        this.cost = 150;
    }
}

class PremiumMembership{
    constructor(name){
        this.name = name;
        this.cost = 500;
    }
}

class MemberFactory{
    static list = {
        simple: SimpleMembership,
        standard:  StandardMembership,
        premium: PremiumMembership
    }

    create(name, type = 'simple'){
        const Membership = MemberFactory.list[type] || MemberFactory.list.simple;
        const member = new Membership(name);
        member.type = type;
        member.define = function(){
           console.log(`${this.name} (${this.type}): ${this.cost}`);
        }
        return member;
    }
}

const factory = new MemberFactory();

members = [
    factory.create('Gena', 'simple'),
    factory.create('Lena', "premium"),
    factory.create('Jeka', 'standard')
]

console.log(members);

members.forEach(function(member) {
    member.define()
})