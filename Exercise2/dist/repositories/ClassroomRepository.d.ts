import { IRepository } from "../interfaces/IRepository";
import { Classroom } from "../models/Classroom";
export declare class ClassroomRepository implements IRepository<Classroom> {
    private static instance;
    private classrooms;
    private logger;
    private constructor();
    static getInstance(): ClassroomRepository;
    save(classroom: Classroom): void;
    findById(name: string): Classroom | undefined;
    findAll(): Classroom[];
    delete(name: string): boolean;
}
//# sourceMappingURL=ClassroomRepository.d.ts.map