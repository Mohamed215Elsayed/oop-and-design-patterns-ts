// ==========================================
// ❌ Bad Example: AreaCalculator doing two things
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

class AreaCalculator {
  protected shapes: Shape[];

  constructor(shapes: Shape[] = []) {
    this.shapes = shapes;
  }

  sum(): number {
    return this.shapes.reduce((total, shape) => total + shape.area(), 0);
  }

  // ❌ SRP VIOLATION: mixing calculation with presentation logic
  // ✅ Correct responsibility: calculate the sum only
  // ❌ Current responsibility: calculate + format output
  output(): string {
    return `Sum of the areas of provided shapes: ${this.sum()}`;
  }

  // Imagine later we need to support JSON API and HTML report...
  // We'd end up adding:
  //   toJSON(): string { return JSON.stringify({ sum: this.sum() }); }
  //   toHTML(): string { return `<div>${this.sum()}</div>`; }
  // Every new output format forces us to modify this class.
  // That's the SRP violation: one class, multiple reasons to change.
}

// ❌ Problem: AreaCalculator knows HOW to calculate AND HOW to display.
// If the display format changes (console → API → PDF), AreaCalculator changes.
// If the calculation logic changes (new shape types), AreaCalculator changes.
// Two reasons to change = violation of Single Responsibility Principle.

const shapesBad: Shape[] = [new Square(5), new Circle(3)];
const calculatorBad = new AreaCalculator(shapesBad);
console.log(calculatorBad.output());
