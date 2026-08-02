class Vehicle {
  constructor(
    protected brand: string,
    protected speed: number,
  ) {}
  // Shared behavior — كل subclass بيورثها جاهزة من غير ما يعيد كتابتها
  accelerate(amount: number): void {
    this.speed += amount;
    console.log(`${this.brand} is now going at ${this.speed} km/h.`);
  }

  brake(amount: number): void {
    this.speed = Math.max(0, this.speed - amount);
    console.log(`${this.brand} slowed down to ${this.speed} km/h.`);
  }
}
// Car بترث كل الـ behavior من Vehicle (accelerate, brake)
// وبتضيف method خاصة بيها بس (honk)
class Car extends Vehicle {
  honk(): void {
    console.log(`${this.brand} says: Beep beep!`);
  }
}
// Motorcycle كمان بترث نفس الـ behavior
// وبتضيف method مختلفة خاصة بيها (wheelie)
class Motorcycle extends Vehicle {
  wheelie(): void {
    console.log(`${this.brand} pops a wheelie!`);
  }
}
const car = new Car('Toyota', 0);
car.accelerate(60); // Toyota is now going at 60 km/h.
car.honk();          // Toyota says: Beep beep!
const motorcycle = new Motorcycle('Harley-Davidson', 0);
motorcycle.accelerate(80); // Harley-Davidson is now going at 80 km/h.
motorcycle.wheelie();      // Harley-Davidson pops a wheelie!