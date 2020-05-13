/* 
* Single Responsibility Principle
* Принцип единственной ответственности (англ. The Single Responsibility Principle, SRP) — принцип ООП, 
* обозначающий, что каждый объект должен иметь одну ответственность и эта ответственность должна быть полностью инкапсулирована в класс.
* Все его поведения должны быть направлены исключительно на обеспечение этой ответственности.
*/

class News {
    constructor(title, text){
       this.title = title;
       this.text = text;
       this.modified = false; 
    }

    update(text) {
        this.text = text;
        this.modified = true;
    }
    // not good, not SRP
    // toHTML(){
    //     return `
    //     <div>
    //         <h1>${this.title}</h1>
    //         <p>${this.text}</p>
    //     </div>
    //     `
    // }

    // toJSON() {
    //     return JSON.stringify({
    //         title: this.title,
    //         text: this.text,
    //         modified: this.modified
    //     }, null, 2);
    // }
}
// good, this SRP, created new class
class NewsPrinter{
    constructor(news){
        this.news = news;
    }

    html(){
        return `
        <div>
            <h1>${this.news.title}</h1>
            <p>${this.news.text}</p>
        </div>
        `
    }  

    json() {
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified
        }, null, 2);
    }
}

const news = new News("COVID-19", "Найдено лекарство!");

const printer = new NewsPrinter(news);

console.log(printer.html());
console.log(printer.json());
news.update("Почти все вылечились!");
console.log(printer.html());
console.log(printer.json());