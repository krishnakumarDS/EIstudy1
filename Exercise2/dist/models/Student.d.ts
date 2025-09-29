export declare class Student {
    private _id;
    private _classrooms;
    constructor(id: string);
    get id(): string;
    get classrooms(): string[];
    enrollInClassroom(classroomName: string): void;
    leaveClassroom(classroomName: string): boolean;
}
//# sourceMappingURL=Student.d.ts.map