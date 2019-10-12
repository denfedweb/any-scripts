window.addEventListener("DOMContentLoaded", function () {

document.querySelector("#load").addEventListener("click", load)

async function load () { //делаем асинхроной функ
  
    const url = "http://jsonplaceholder.typicode.com/users";
    // console.log("try");
//пример с "не асинк" функцией
//    fetch(url)
//    .then((res)=>{ //res то что отправит сервер
// // console.log(res);
// return res.json() //получили обьект рес и возвращаем нрвый промис
//    })
//    .then((data)=> {
// //    console.log(data);
// const ul = document.getElementById("list")
// const html = data.map((item)=>{

// return `<li>${item.id} ${item.name} (${item.email})</li>`
// })
// // console.log(html);
// ul.insertAdjacentHTML("afterbegin", html.join(" "))//join превращает в обычную строку, инсертАджачент позволят в какой то место положить хтмл набор
//    })
//когда функция асинk
const res = await fetch(url)
const data = await res.json()
const ul = document.getElementById("list")

const html = data.map((item)=>{

return `<li>${item.id} ${item.name} (${item.email})</li>`
})
// console.log(html);

 ul.insertAdjacentHTML("afterbegin", html.join(" ")) 
   
}

















  
});