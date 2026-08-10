// ==========================================
// ✅ Good Example: Single Responsibility
// ==========================================

interface Shape {
  area(): number;
}

class Square implements Shape {
  constructor(private side: number) {}
  area() {
    return this.side * this.side;
  }
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area() {
    return Math.PI * this.radius * this.radius;
  }
}

// ✅ Responsibility 1: Calculate the sum of areas
class AreaCalculator {
  protected shapes: Shape[];

  constructor(shapes: Shape[] = []) {
    this.shapes = shapes;
  }

  sum(): number {
    return this.shapes.reduce((total, shape) => total + shape.area(), 0);
  }
}

// ✅ Responsibility 2: Format the output (separate class)
class AreaPrinter {
  constructor(private calculator: AreaCalculator) {}

  print(): string {
    return `Sum of the areas of provided shapes: ${this.calculator.sum()}`;
  }

  toJSON(): string {
    return JSON.stringify({ sum: this.calculator.sum() });
  }

  toHTML(): string {
    return `<div>Sum: ${this.calculator.sum()}</div>`;
  }
}

// ✅ Now each class has ONE reason to change:
// - AreaCalculator changes only if calculation logic changes
// - AreaPrinter changes only if output format changes

const shapesGood: Shape[] = [new Square(5), new Circle(3)];
const calculatorGood = new AreaCalculator(shapesGood);
const printer = new AreaPrinter(calculatorGood);

console.log(printer.print());
console.log(printer.toJSON());
console.log(printer.toHTML());
