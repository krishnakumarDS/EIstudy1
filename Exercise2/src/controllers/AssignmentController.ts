import { IAssignmentService } from "../interfaces/IAssignmentService";
import { AssignmentService } from "../services/AssignmentService";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";

export class AssignmentController {
  private assignmentService: IAssignmentService;
  private logger: ILogger;

  constructor() {
    this.assignmentService = new AssignmentService();
    this.logger = Logger.getInstance();
  }

  scheduleAssignment(className: string, details: string): string {
    try {
      this.assignmentService.scheduleAssignment(className, details);
      return `Assignment for ${className} has been scheduled.`;
    } catch (error) {
      this.logger.error(
        `Error scheduling assignment: ${(error as Error).message}`
      );
      throw error;
    }
  }

  submitAssignment(
    studentId: string,
    className: string,
    assignmentDetails: string
  ): string {
    try {
      const success = this.assignmentService.submitAssignment(
        studentId,
        className,
        assignmentDetails
      );
      if (success) {
        return `Assignment submitted by Student ${studentId} in ${className}.`;
      } else {
        return `Failed to submit assignment for Student ${studentId} in ${className}.`;
      }
    } catch (error) {
      this.logger.error(
        `Error submitting assignment: ${(error as Error).message}`
      );
      throw error;
    }
  }

  listAssignments(): string {
    try {
      const assignments = this.assignmentService.getAllAssignments();
      if (assignments.length === 0) {
        return "No assignments available.";
      }

      let result = "Available Assignments:\n";
      assignments.forEach((assignment) => {
        result += `- ${assignment.id}: ${assignment.details} (Class: ${assignment.className}, Submissions: ${assignment.submissions.size})\n`;
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Error listing assignments: ${(error as Error).message}`
      );
      throw error;
    }
  }

  listAssignmentsForClassroom(className: string): string {
    try {
      const assignments = this.assignmentService.getAllAssignments();
      const assignmentsForClassroom = assignments.filter(
        (assignment) => assignment.className === className
      );

      if (assignmentsForClassroom.length === 0) {
        return `No assignments found for classroom ${className}.`;
      }

      let result = `Assignments for Classroom ${className}:\n`;
      assignmentsForClassroom.forEach((assignment) => {
        result += `- ${assignment.id}: ${assignment.details} (Submissions: ${assignment.submissions.size})\n`;
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Error listing assignments for classroom: ${(error as Error).message}`
      );
      throw error;
    }
  }
}
