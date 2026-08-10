// ==========================================
// ✅ Solution with Abstract Class(Inheritance) and Liskov Substitution Principle
// ==========================================

abstract class Shape {
  abstract getArea(): number;
}
// ==========================================
class Rectangle extends Shape {
  protected width: number = 0;
  protected height: number = 0;

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}
// ==========================================
class Square extends Shape {
  private side: number = 0;

  setSide(side: number): void {
    this.side = side;
  }

  getArea(): number {
    return this.side * this.side;
  }
}
// ==========================================
function testArea(shape: Shape): void {
  console.log("Area:", shape.getArea());
}
// ==========================================
const rect = new Rectangle();
rect.setWidth(6);
rect.setHeight(10);
testArea(rect); // النتيجة: 60 ✅ صحيحة
// ==========================================
const square = new Square();
square.setSide(10);
testArea(square); // النتيجة: 100 ✅ صحيحة (لأن Square مستقلة تمامًا)
