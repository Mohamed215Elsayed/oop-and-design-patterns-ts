// ==========================================
// ❌ Bad Example: tightly coupled to concrete classes
// ==========================================

class Designer {
  doDesign(): void {
    console.log("Designer is designing...");
  }
}

class Programmer {
  writeCode(): void {
    console.log("Programmer is writing code...");
  }
}

class Tester {
  runTests(): void {
    console.log("Tester is running tests...");
  }
}

class Company {
  // ❌ Problem 1: Tight Coupling
  // Company depends on concrete classes directly.
  // Any change in Designer/Programmer/Tester signatures breaks Company.
  private designers: Designer[] = [];
  private programmers: Programmer[] = [];
  private testers: Tester[] = [];

  // ❌ Problem 2: Open/Closed Principle Violation
  // Every new employee type (Artist, QA, DevOps...) forces us to:
  //   - add a new array property here
  //   - add a new addXxx() method here
  //   - modify createSoftware() to handle the new type
  // The class is never closed for modification.
  addDesigner(designer: Designer): void {
    this.designers.push(designer);
  }

  addProgrammer(programmer: Programmer): void {
    this.programmers.push(programmer);
  }

  addTester(tester: Tester): void {
    this.testers.push(tester);
  }

  // ❌ Problem 3: Code Duplication & Low Reusability
  // We repeat the same loop pattern for every employee type.
  // If we want to change how we iterate or log, we must change every loop.
  createSoftware(): void {
    for (const designer of this.designers) {
      designer.doDesign();
    }
    for (const programmer of this.programmers) {
      programmer.writeCode();
    }
    for (const tester of this.testers) {
      tester.runTests();
    }
  }

  // ❌ Problem 4: Single Responsibility Principle Violation
  // Company now has TWO responsibilities:
  //   1. Manage the software creation process
  //   2. Know the internal details of every employee type
  // If any employee type changes, Company must change too.
}

// ❌ Problem 5: Hard to Test & Extend
// We cannot mock or swap employee types easily.
// We cannot add a new employee type without editing Company.
const company = new Company();
company.addDesigner(new Designer());
company.addProgrammer(new Programmer());
company.addTester(new Tester());
company.createSoftware();
