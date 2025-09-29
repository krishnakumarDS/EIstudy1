import { IClassroomService } from "../interfaces/IClassroomService";
import { Classroom } from "../models/Classroom";
import { ClassroomRepository } from "../repositories/ClassroomRepository";
import { StudentRepository } from "../repositories/StudentRepository";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";
import { ErrorHandler } from "../utils/ErrorHandler";

export class ClassroomService implements IClassroomService {
  private classroomRepository: ClassroomRepository;
  private studentRepository: StudentRepository;
  private logger: ILogger;
  private errorHandler: ErrorHandler;

  constructor() {
    this.classroomRepository = ClassroomRepository.getInstance();
    this.studentRepository = StudentRepository.getInstance();
    this.logger = Logger.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
  }

  addClassroom(name: string): Classroom {
    try {
      // Check if classroom already exists
      const existingClassroom = this.classroomRepository.findById(name);
      if (existingClassroom) {
        throw new Error(`Classroom with name ${name} already exists`);
      }

      const classroom = new Classroom(name);
      this.classroomRepository.save(classroom);
      this.logger.log(`Classroom ${name} created successfully`);
      return classroom;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to add classroom ${name}`
      );
      throw error;
    }
  }

  getClassroom(name: string): Classroom | undefined {
    try {
      return this.classroomRepository.findById(name);
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to get classroom ${name}`
      );
      throw error;
    }
  }

  getAllClassrooms(): Classroom[] {
    try {
      return this.classroomRepository.findAll();
    } catch (error) {
      this.errorHandler.handle(error as Error, "Failed to get all classrooms");
      throw error;
    }
  }

  removeClassroom(name: string): boolean {
    try {
      const classroom = this.classroomRepository.findById(name);
      if (!classroom) {
        throw new Error(`Classroom ${name} not found`);
      }

      // Remove classroom from all students
      const students = this.studentRepository.findAll();
      students.forEach((student) => {
        if (student.classrooms.includes(name)) {
          student.leaveClassroom(name);
          this.studentRepository.save(student);
        }
      });

      // Delete the classroom
      const result = this.classroomRepository.delete(name);
      this.logger.log(`Classroom ${name} removed successfully`);
      return result;
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Failed to remove classroom ${name}`
      );
      throw error;
    }
  }
}
