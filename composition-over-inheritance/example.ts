// /**************************/
// /*  ❌ PROBLEM: Rigid Inheritance Hierarchy
// /**************************/
// abstract class DuckBad {
//     quack(): void {
//         console.log('Quack!');
//     }

//     // If we put fly() here, EVERY duck flies — even RubberDuck!
//     fly(): void {
//         console.log('Flying...');
//     }
// }

// class MallardDuckBad extends DuckBad {//بطه بريه
//     // Do any thing... flies normally, fine.
// }

// class RubberDuckBad extends DuckBad {//بطه مطاطيه
//     // ❌ Problem: RubberDuck now flies too — but a rubber duck can't fly!
//     // We'd have to override fly() to do nothing, which is a code smell,//جود خلل في الكود،
//     // and breaks the Liskov Substitution Principle (LSP).
// }

/**************************/
/*  ✅ SOLUTION: Composition over Inheritance
/**************************/
interface FlyBehavior {
    fly(): void;
}
/**************************/
class FlyWithWings implements FlyBehavior {
    fly(): void {
        console.log('Flying with wings!');
    }
}
/**************************/
class CannotFly implements FlyBehavior {
    fly(): void {
        console.log("I can't fly...");
    }
}
/**************************/
interface QuackBehavior {
    quack(): void;
}
/**************************/
class NormalQuack implements QuackBehavior {
    quack(): void {
        console.log('Quack!');
    }
}
/**************************/
class Squeak implements QuackBehavior {
    quack(): void {
        console.log('Squeak!');
    }
}
/**************************/
class Duck {
    // Composition — Duck HAS-A FlyBehavior and HAS-A QuackBehavior,
    // instead of INHERITING a fixed fly()/quack() implementation.
    // The behavior is injected from outside, so it can change per
    // instance, and even at runtime — no rigid hierarchy required.
    constructor(
        private flyBehavior: FlyBehavior,
        private quackBehavior: QuackBehavior
    ) { }

    performFly(): void {
        this.flyBehavior.fly();
    }

    performQuack(): void {
        this.quackBehavior.quack();
    }

    // Behavior can even be swapped at runtime — impossible with inheritance
    setFlyBehavior(flyBehavior: FlyBehavior): void {
        this.flyBehavior = flyBehavior;
    }
}
/**************************/
const mallardDuck = new Duck(new FlyWithWings(), new NormalQuack());
mallardDuck.performFly();
mallardDuck.performQuack();

const rubberDuck = new Duck(new CannotFly(), new Squeak());
rubberDuck.performFly();
rubberDuck.performQuack();

// Runtime behavior swap — the rubber duck learns to fly! (e.g. in a game power-up)
rubberDuck.setFlyBehavior(new FlyWithWings());
rubberDuck.performFly();