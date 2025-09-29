import { IStudentService } from "../interfaces/IStudentService";
import { Student } from "../models/Student";
export declare class StudentService implements IStudentService {
    private studentRepository;
    private classroomRepository;
    private logger;
    private errorHandler;
    constructor();
    addStudent(id: string): Student;
    getStudent(id: string): Student | undefined;
    getAllStudents(): Student[];
    enrollStudent(studentId: string, classroomName: string): boolean;
    removeStudent(id: string): boolean;
}
//# sourceMappingURL=StudentService.d.ts.map