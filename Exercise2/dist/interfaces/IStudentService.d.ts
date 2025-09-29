import { Student } from "../models/Student";
export interface IStudentService {
    addStudent(id: string): Student;
    getStudent(id: string): Student | undefined;
    getAllStudents(): Student[];
    enrollStudent(studentId: string, classroomName: string): boolean;
    removeStudent(id: string): boolean;
}
//# sourceMappingURL=IStudentService.d.ts.map