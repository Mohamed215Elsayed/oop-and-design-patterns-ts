abstract class Members {
    constructor(protected status: string) {
        this.status = status;
    }

    getStatus(): string {
        return this.status;
    }
}
/**************************/
class Heart extends Members {
    // Do any thing...
}
/**************************/
class Brain extends Members {
    // Do any thing...
}
/**************************/
class Person {
    // Composition — Person creates and owns (Heart) and (Brain)
    // They are created INSIDE the Owner and can't exist/be passed from outside
    private heart: Heart;
    private brain: Brain;

    constructor() {
        this.heart = new Heart('Strong');
        this.brain = new Brain('Smart');
    }

    printPersonDetails(): void {
        console.log(
            `Heart is ${this.heart.getStatus()} And Brain is ${this.brain.getStatus()}`
        );
    }
}
/**************************/
let person: Person | null = new Person();
person.printPersonDetails();

person = null; // Simulates the Person's death — Heart and Brain die with it,
// there is no way to access them from outside anymore
// console.log(person?.heart.getStatus());//undefined 
// console.log(person?.brain.getStatus());