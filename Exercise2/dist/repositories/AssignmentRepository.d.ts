import { IRepository } from "../interfaces/IRepository";
import { Assignment } from "../models/Assignment";
export declare class AssignmentRepository implements IRepository<Assignment> {
    private static instance;
    private assignments;
    private logger;
    private idCounter;
    private constructor();
    static getInstance(): AssignmentRepository;
    save(assignment: Assignment): void;
    findById(id: string): Assignment | undefined;
    findAll(): Assignment[];
    delete(id: string): boolean;
    generateId(): string;
}
//# sourceMappingURL=AssignmentRepository.d.ts.map