/* 
* Open Closed Principle
* При́нцип откры́тости/закры́тости (англ. The Open Closed Principle, OCP) — принцип ООП, 
* устанавливающий следующее положение: «программные сущности (классы, модули, функции и т. п.) должны быть открыты для расширения,
* но закрыты для изменения»;
*/

class Square {
    constructor(size){
        this.type = 'square';
        this.size = size;
    }
}

class Circle {
    constructor(radius){
        this.type = 'circle';
        this.radius = radius;
    }
}

class Rectangle {
    constructor(width, height){
        this.type = '';
        this.width = width;
        this.height = height;
    }
}

class AreaCalc {
    constructor(shapes = []){
        this.shapes = shapes;
    }

    sum(){
        return this.shapes.reduce((acc, shape)=>{
            if(shape.type === 'circle') {
                acc += (shape.radius ** 2) * Math.PI;
            } else if (shape.type === 'square') {
                acc += shape.size ** 2;
            }

            return acc;
        }, 0)
    }

}

const calc = new AreaCalc([
    new Square(10),
    new Circle(5),
    new Circle(2)
])

console.log(calc.sum());