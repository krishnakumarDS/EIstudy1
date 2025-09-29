export declare class AssignmentController {
    private assignmentService;
    private logger;
    constructor();
    scheduleAssignment(className: string, details: string): string;
    submitAssignment(studentId: string, className: string, assignmentDetails: string): string;
    listAssignments(): string;
    listAssignmentsForClassroom(className: string): string;
}
//# sourceMappingURL=AssignmentController.d.ts.map