// function Server(name, ip) { 
//     this.name = name;
//     this.ip = ip;
//  }

// Server.prototype.getUrl = function(){
//     return `https://${this.ip}:8080`
// }

// const aws = new Server('AWS German', '82.82.81.32');

// console.log(aws.getUrl());

class Server {
    constructor(name, ip){
        this.name = name;
        this.ip = ip;
    }

    getUrl() {
        return `https://${this.ip}:8080`
    }
}

const aws = new Server('AWS German', '82.82.81.32');

console.log(aws.getUrl());