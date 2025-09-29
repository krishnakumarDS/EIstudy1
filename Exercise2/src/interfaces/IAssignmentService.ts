import { Assignment } from "../models/Assignment";

export interface IAssignmentService {
  scheduleAssignment(className: string, details: string): Assignment;
  getAssignment(id: string): Assignment | undefined;
  getAllAssignments(): Assignment[];
  submitAssignment(
    studentId: string,
    className: string,
    assignmentDetails: string
  ): boolean;
  removeAssignment(id: string): boolean;
}
