import { IAssignmentService } from "../interfaces/IAssignmentService";
import { Assignment } from "../models/Assignment";
export declare class AssignmentService implements IAssignmentService {
    private assignmentRepository;
    private classroomRepository;
    private studentRepository;
    private logger;
    private errorHandler;
    constructor();
    scheduleAssignment(className: string, details: string): Assignment;
    getAssignment(id: string): Assignment | undefined;
    getAllAssignments(): Assignment[];
    submitAssignment(studentId: string, className: string, assignmentDetails: string): boolean;
    removeAssignment(id: string): boolean;
}
//# sourceMappingURL=AssignmentService.d.ts.map