abstract class Shape {
    constructor(protected name: string) { }
    abstract calculateArea(): number;
    describe(): string {
        return `${this.name} has an area of ${this.calculateArea()} square units.`;
    }

}
class Circle extends Shape {
    constructor(private radius: number) {
        super('Circle');
    }
    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}
class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super('Rectangle');
    }
    calculateArea(): number {
        return this.width * this.height;
    }
}
// Example usage:
// const circle = new Circle(5);
// console.log(circle.describe()); // Output: Circle has an area of 78.53981633974483 square units.
// const rectangle = new Rectangle(4, 6);
// console.log(rectangle.describe()); // Output: Rectangle  has an area of 24 square units.
const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(shape => {
    console.log(shape.describe());
});