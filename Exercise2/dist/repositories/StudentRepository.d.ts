import { IRepository } from "../interfaces/IRepository";
import { Student } from "../models/Student";
export declare class StudentRepository implements IRepository<Student> {
    private static instance;
    private students;
    private logger;
    private constructor();
    static getInstance(): StudentRepository;
    save(student: Student): void;
    findById(id: string): Student | undefined;
    findAll(): Student[];
    delete(id: string): boolean;
}
//# sourceMappingURL=StudentRepository.d.ts.map