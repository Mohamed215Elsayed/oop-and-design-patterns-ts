// ==========================================
// ✅ Good Example: Company بتعتمد على Employee interface بس
// ==========================================
// 1. تعريف الـ interface اللي فيها الـ method المشتركة
interface Employee {
  doWork(): void;
}
// 2. كل نوع موظف بيعمل implement للـ interface
class Designer implements Employee {
  doWork(): void {
    console.log("Designer is designing...");
  }
}

class Programmer implements Employee {
  doWork(): void {
    console.log("Programmer is writing code...");
  }
}

class Tester implements Employee {
  doWork(): void {
    console.log("Tester is running tests...");
  }
}
// ==========================================
// إضافة نوع موظف جديد (Artist) بدون أي تعديل في Company!
// ==========================================
class Artist implements Employee {
  doWork(): void {
    console.log("Artist is creating graphics...");
  }
}

// abstract class Company {
//   abstract getEmployees(): Employee[];

//   createSoftware(): void {
//     for (const employee of this.getEmployees()) {
//       employee.doWork();
//     }
//   }
// }

// class GameDevCompany extends Company {
//   getEmployees(): Employee[] {
//     return [new Designer(), new Programmer(), new Tester(), new Artist()];
//   }
// }

// class OutsourcingCompany extends Company {
//   getEmployees(): Employee[] {
//     return [new Programmer(), new Tester()];
//   }
// }

// const gameDev = new GameDevCompany();
// gameDev.createSoftware();

// console.log("---");

// const outsourcing = new OutsourcingCompany();
// outsourcing.createSoftware();


// 3. Company بقت تتعامل مع Employee[] بس، مش مع أي concrete class
class Company {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  // ✅ Company مش عارفة ولا مهتمة بنوع الموظف، بس بتنادي doWork()
  createSoftware(): void {
    for (const employee of this.employees) {
      employee.doWork();
    }
  }
}

const company = new Company();
company.addEmployee(new Designer());
company.addEmployee(new Programmer());
company.addEmployee(new Tester());
company.addEmployee(new Artist()); // ✅ إضافة جديدة، Company لم تُعدَّل إطلاقًا

company.createSoftware();
