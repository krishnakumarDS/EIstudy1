export declare class Assignment {
    private _id;
    private _className;
    private _details;
    private _submissions;
    constructor(id: string, className: string, details: string);
    get id(): string;
    get className(): string;
    get details(): string;
    get submissions(): Map<string, boolean>;
    submitAssignment(studentId: string): boolean;
    isSubmittedBy(studentId: string): boolean;
}
//# sourceMappingURL=Assignment.d.ts.map