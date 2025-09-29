import { IStudentService } from "../interfaces/IStudentService";
import { Student } from "../models/Student";
import { StudentRepository } from "../repositories/StudentRepository";
import { ClassroomRepository } from "../repositories/ClassroomRepository";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";
import { ErrorHandler } from "../utils/ErrorHandler";

export class StudentService implements IStudentService {
  private studentRepository: StudentRepository;
  private classroomRepository: ClassroomRepository;
  private logger: ILogger;
  private errorHandler: ErrorHandler;

  constructor() {
    this.studentRepository = StudentRepository.getInstance();
    this.classroomRepository = ClassroomRepository.getInstance();
    this.logger = Logger.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
  }

  addStudent(id: string): Student {
    try {
      // Check if student already exists
      const existingStudent = this.studentRepository.findById(id);
      if (existingStudent) {
        throw new Error(`Student with ID ${id} already exists`);
      }

      const student = new Student(id);
      this.studentRepository.save(student);
      this.logger.log(`Student ${id} created successfully`);
      return student;
    } catch (error) {
      this.errorHandler.handle(error as Error, `Failed to add student ${id}`);
      throw error;
    }
  }

  getStudent(id: string): Student | undefined {
    try {
      return this.studentRepository.findById(id);
    } catch (error) {
      this.errorHandler.handle(error as Error, `Failed to get student ${id}`);
      throw error;
    }
  }

  getAllStudents(): Student[] {
    try {
      return this.studentRepository.findAll();
    } catch (error) {
      this.errorHandler.handle(error as Error, "Failed to get all students");
      throw error;
    }
  }

  enrollStudent(studentId: string, classroomName: string): boolean {
    try {
      const student = this.studentRepository.findById(studentId);
      if (!student) {
        throw new Error(`Student ${studentId} not found`);
      }

      const classroom = this.classroomRepository.findById(classroomName);
      if (!classroom) {
        throw new Error(`Classroom ${classroomName} not found`);
      }

      // Enroll student in classroom
      student.enrollInClassroom(classroomName);
      classroom.addStudent(studentId);

      // Save changes
      this.studentRepository.save(student);
      this.classroomRepository.save(classroom);

      this.logger.log(
        `Student ${studentId} enrolled in classroom ${classroomName}`
      );
      return true;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to enroll student ${studentId} in classroom ${classroomName}`
      );
      throw error;
    }
  }

  removeStudent(id: string): boolean {
    try {
      const student = this.studentRepository.findById(id);
      if (!student) {
        throw new Error(`Student ${id} not found`);
      }

      // Remove student from all classrooms
      student.classrooms.forEach((classroomName) => {
        const classroom = this.classroomRepository.findById(classroomName);
        if (classroom) {
          classroom.removeStudent(id);
          this.classroomRepository.save(classroom);
        }
      });

      // Delete the student
      const result = this.studentRepository.delete(id);
      this.logger.log(`Student ${id} removed successfully`);
      return result;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to remove student ${id}`
      );
      throw error;
    }
  }
}
