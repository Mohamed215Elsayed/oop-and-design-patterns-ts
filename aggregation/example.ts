abstract class Users {
    constructor(protected name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}
/**************************/
class Teacher extends Users {
    // Do any thing...
}
/**************************/
class Student extends Users {
    // Do any thing...
}
/**************************/
class CollageA {
    private name: string;
    private teachers: Teacher[];
    private students: Student[];

    constructor(name: string, teachers: Teacher[], students: Student[]) {
        this.name = name;
        // Aggregation — CollageA has (Teachers) and (Students)
        // but doesn't own their life-cycle
        this.teachers = teachers;
        this.students = students;
    }

    printCollageDetails(): void {
        const teachersList = this.teachers.map(teacher => teacher.getName());
        const studentsList = this.students.map(student => student.getName());

        console.log(
            `Collage Name: ${this.name}
Teachers: ${teachersList.join(', ')}
Students: ${studentsList.join(', ')}`
        );
    }
}
/**************************/
const tech1 = new Teacher('Hikmat');
const tech2 = new Teacher('Ahmad');

const std1 = new Student('Anees');
const std2 = new Student('Taher');
const std3 = new Student('Saed');

let collage: CollageA | null = new CollageA(
    'Information Technology',
    [tech1, tech2],
    [std1, std2, std3]
);

collage.printCollageDetails();

collage = null; // Simulates deleting the collage — Teachers/Students still exist
console.log(tech1.getName());
console.log(std1.getName());