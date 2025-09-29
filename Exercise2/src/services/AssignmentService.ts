import { IAssignmentService } from "../interfaces/IAssignmentService";
import { Assignment } from "../models/Assignment";
import { AssignmentRepository } from "../repositories/AssignmentRepository";
import { ClassroomRepository } from "../repositories/ClassroomRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";
import { ErrorHandler } from "../utils/ErrorHandler";

export class AssignmentService implements IAssignmentService {
  private assignmentRepository: AssignmentRepository;
  private classroomRepository: ClassroomRepository;
  private studentRepository: StudentRepository;
  private logger: ILogger;
  private errorHandler: ErrorHandler;

  constructor() {
    this.assignmentRepository = AssignmentRepository.getInstance();
    this.classroomRepository = ClassroomRepository.getInstance();
    this.studentRepository = StudentRepository.getInstance();
    this.logger = Logger.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
  }

  scheduleAssignment(className: string, details: string): Assignment {
    try {
      const classroom = this.classroomRepository.findById(className);
      if (!classroom) {
        throw new Error(`Classroom ${className} not found`);
      }

      const assignmentId = this.assignmentRepository.generateId();
      const assignment = new Assignment(assignmentId, className, details);

      this.assignmentRepository.save(assignment);
      classroom.addAssignment(assignmentId);
      this.classroomRepository.save(classroom);

      this.logger.log(`Assignment scheduled for classroom ${className}`);
      return assignment;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to schedule assignment for classroom ${className}`
      );
      throw error;
    }
  }

  getAssignment(id: string): Assignment | undefined {
    try {
      return this.assignmentRepository.findById(id);
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to get assignment ${id}`
      );
      throw error;
    }
  }

  getAllAssignments(): Assignment[] {
    try {
      return this.assignmentRepository.findAll();
    } catch (error) {
      this.errorHandler.handle(error as Error, "Failed to get all assignments");
      throw error;
    }
  }

  submitAssignment(
    studentId: string,
    className: string,
    assignmentDetails: string
  ): boolean {
    try {
      const student = this.studentRepository.findById(studentId);
      if (!student) {
        throw new Error(`Student ${studentId} not found`);
      }

      const classroom = this.classroomRepository.findById(className);
      if (!classroom) {
        throw new Error(`Classroom ${className} not found`);
      }

      // Check if student is enrolled in the classroom
      if (!student.classrooms.includes(className)) {
        throw new Error(
          `Student ${studentId} is not enrolled in classroom ${className}`
        );
      }

      // Find the assignment by details (in a real system, we would use assignment ID)
      const assignments = this.assignmentRepository.findAll();
      const assignment = assignments.find(
        (a) => a.className === className && a.details === assignmentDetails
      );

      if (!assignment) {
        throw new Error(
          `Assignment not found for classroom ${className} with specified details`
        );
      }

      // Submit the assignment
      const result = assignment.submitAssignment(studentId);
      if (result) {
        this.assignmentRepository.save(assignment);
        this.logger.log(
          `Assignment submitted by student ${studentId} in classroom ${className}`
        );
      }

      return result;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to submit assignment for student ${studentId} in classroom ${className}`
      );
      throw error;
    }
  }

  removeAssignment(id: string): boolean {
    try {
      const assignment = this.assignmentRepository.findById(id);
      if (!assignment) {
        throw new Error(`Assignment ${id} not found`);
      }

      // Remove assignment from classroom
      const classroom = this.classroomRepository.findById(assignment.className);
      if (classroom) {
        classroom.removeAssignment(id);
        this.classroomRepository.save(classroom);
      }

      // Delete the assignment
      const result = this.assignmentRepository.delete(id);
      this.logger.log(`Assignment ${id} removed successfully`);
      return result;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to remove assignment ${id}`
      );
      throw error;
    }
  }
}
