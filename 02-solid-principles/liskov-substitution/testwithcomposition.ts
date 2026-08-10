// ==========================================
// ✅ Solution with (Composition and Liskov Substitution Principle)
// ==========================================
interface Shape {
  getArea(): number;
}
// ==========================================
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

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
class Square implements Shape {
  constructor(private side: number) {}

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
const rect = new Rectangle(6, 10);
testArea(rect); // النتيجة: 60 ✅ صحيحة
// ==========================================
const square = new Square(10);
testArea(square); // النتيجة: 100 ✅ صحيحة
