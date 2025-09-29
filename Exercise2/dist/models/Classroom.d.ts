export declare class Classroom {
    private _name;
    private _students;
    private _assignments;
    constructor(name: string);
    get name(): string;
    get students(): string[];
    get assignments(): string[];
    addStudent(studentId: string): void;
    removeStudent(studentId: string): boolean;
    addAssignment(assignmentId: string): void;
    removeAssignment(assignmentId: string): boolean;
}
//# sourceMappingURL=Classroom.d.ts.map