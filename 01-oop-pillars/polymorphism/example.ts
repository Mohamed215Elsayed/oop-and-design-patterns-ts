abstract class Animal {
  constructor(protected name: string) {}
  // Same method name — different implementation per subclass
  abstract sound(): string;
  describe(): void {
    console.log(`${this.name} says: ${this.sound()}`);
  }
}
class Cat extends Animal {
  sound(): string {
    return "Meow!";
  }
}
class Dog extends Animal {
  sound(): string {
    return "Woof!";
  }
}
class Cow extends Animal {
  sound(): string {
    return "Moo";
  }
}
const animals: Animal[] = [new Cat("Whiskers"), new Dog("Buddy"), new Cow("Bessie")];
animals.forEach((animal) => animal.describe());
// Whiskers says: Meow
// Rex says: Woof
// Bessie says: Moo

// لاحظ: الكود اللي بينده على describe() مش عارف ولا محتاج يعرف
// نوع الـ animal بالظبط — هو بس عارف إنه "Animal" وعنده sound()،
// والتنفيذ الصح بيتحدد تلقائيًا وقت الـ runtime حسب النوع الفعلي.