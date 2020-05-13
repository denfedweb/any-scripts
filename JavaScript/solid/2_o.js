/* 
* Open Closed Principle
* При́нцип откры́тости/закры́тости (англ. The Open Closed Principle, OCP) — принцип ООП, 
* устанавливающий следующее положение: «программные сущности (классы, модули, функции и т. п.) должны быть открыты для расширения,
* но закрыты для изменения»;
*/

class Square {
    constructor(size){
        this.size = size;
    }
}

class Circle{
    constructor(radius){
        this.radius = radius;
    }
}

