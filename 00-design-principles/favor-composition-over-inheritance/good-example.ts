// ==========================================
// ✅ Good Example: Composition بدل Inheritance
// ==========================================

// 1. تعريف الـ interfaces المستقلة لكل "بُعد" (dimension)
interface Engine {
  move(): void;
}

interface Driver {
  navigate(): void;
}
// 2. تنفيذ (implement) كل نوع محرك بشكل مستقل
class CombustionEngine implements Engine {
  move(): void {
    console.log("Moving using combustion engine...");
  }
}

class ElectricEngine implements Engine {
  move(): void {
    console.log("Moving using electric engine...");
  }
}
//new engine type
class WaterEngine implements Engine {
  move(): void {
    console.log("Moving using water engine...");
  }
}
// 3. تنفيذ (implement) كل نوع سائق بشكل مستقل
class Human implements Driver {
  navigate(): void {
    console.log("Human is navigating manually...");
  }
}

class Robot implements Driver {
  navigate(): void {
    console.log("Robot is navigating using autopilot...");
  }
}
class AI implements Driver {
  navigate(): void {
    console.log("AI is navigating using advanced algorithms...");
  }
}
// 4. Transport بقى "has a" Engine و "has a" Driver بدل ما يرثهم
class Transport {
  constructor(
    private engine: Engine,
    private driver: Driver,
  ) {}

  deliver(destination: string, cargo: string): void {
    this.driver.navigate();
    this.engine.move();
    console.log(`Delivered ${cargo} to ${destination}`);
  }
  // ✅ ممكن نغيّر الـ engine أو الـ driver في أي وقت أثناء الـ runtime!
  setEngine(engine: Engine): void {
    this.engine = engine;
  }

  setDriver(driver: Driver): void {
    this.driver = driver;
  }
}
// ==========================================
// تجربة الكود
// ==========================================

// عربية عادية بمحرك بنزين وسائق بشري
const car1 = new Transport(new CombustionEngine(), new Human());
car1.deliver("Alexandria", "Books");

console.log("-----");
// نفس الـ object، لكن نغيّر المحرك لكهربائي والسائق لـ Robot (Autopilot)
// بدون ما نحتاج نعمل class جديد!
car1.setEngine(new ElectricEngine());
car1.setDriver(new Robot());
car1.deliver("Giza", "Electronics");

console.log("-----");

// شاحنة بمحرك كهربائي وautopilot من البداية
const truck1 = new Transport(new ElectricEngine(), new Robot());
truck1.deliver("Cairo", "Furniture");

console.log("-----");

// لو حبينا نضيف نوع محرك جديد (waterEngine) أو نوع سائق جديد，
// كل اللي هنعمله: class جديد implement لـ Engine أو Driver
// من غير أي تعديل في Transport، ومن غير أي تضخم في عدد الـ classes!
const boat1 = new Transport(new WaterEngine(), new AI());
boat1.deliver("Nile", "Fish");