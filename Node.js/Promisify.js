const fs = require("fs");
const util = require("util");

// fs.readdir(__dirname, (error, files)=>{
//     if (error) throw error;

//     files.forEach(file => {
//         fs.readFile(file, "utf-8", (err, data)=>{
//             if (err) throw err;

//             console.log(data);
//         });
//     });

//     console.log(files);
// });

// function promisify(fn){
//     return function(...args){
//         return new Promise((resolve, reject)=>{
//             fn(...args, (error, data)=>{
//                 if (error) return reject(error);

//                 resolve(data);
//             });
//         });
//     }
// }

// default in nodejs in util (util.promisify)
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);


readdir(__dirname)
.then(files => files.map(file=>readFile(file, "utf-8")))
.then(result => Promise.all(result))
.then(data => console.log(data[0]))
.catch(err => console.error(err));