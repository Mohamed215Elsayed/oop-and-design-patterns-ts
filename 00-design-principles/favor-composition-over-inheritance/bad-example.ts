// ==========================================
// ❌ Bad Example: Parallel Inheritance Hierarchies
// ==========================================

abstract class Transport {
  abstract deliver(destination: string, cargo: string): void;
}

abstract class Truck extends Transport {}
abstract class Car extends Transport {}

abstract class ElectricTruck extends Truck {}
abstract class CombustionEngineTruck extends Truck {}

abstract class ElectricCar extends Car {}
abstract class CombustionEngineCar extends Car {}

// ❌ عايزين نضيف ميزة Autopilot => لازم نعمل subclass لكل تركيبة!
class AutopilotElectricTruck extends ElectricTruck {
  deliver(destination: string, cargo: string): void {
    console.log(`Autopilot Electric Truck delivering ${cargo} to ${destination}`);
  }
}

class AutopilotCombustionEngineTruck extends CombustionEngineTruck {
  deliver(destination: string, cargo: string): void {
    console.log(`Autopilot Combustion Truck delivering ${cargo} to ${destination}`);
  }
}

class AutopilotElectricCar extends ElectricCar {
  deliver(destination: string, cargo: string): void {
    console.log(`Autopilot Electric Car delivering ${cargo} to ${destination}`);
  }
}

class AutopilotCombustionEngineCar extends CombustionEngineCar {
  deliver(destination: string, cargo: string): void {
    console.log(`Autopilot Combustion Car delivering ${cargo} to ${destination}`);
  }
}

// المشكلة:
// - عندنا الآن 4 subclasses بس عشان نغطي Truck/Car × Electric/Combustion × Autopilot
// - لو أضفنا "waterEngine" هيبقوا 6 تركيبات
// - لو أضفنا "Bus" هيبقوا 9 تركيبات بدون حتى حساب الـ Autopilot!
// - كل ميزة (dimension) جديدة بتضاعف عدد الـ classes بشكل كبير (parameter^n تقريبًا)
// - وكل subclass بيكرر جزء كبير من الكود (duplication)

const truck1 = new AutopilotElectricTruck();
truck1.deliver("Cairo", "Furniture");