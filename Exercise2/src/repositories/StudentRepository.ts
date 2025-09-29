import { IRepository } from "../interfaces/IRepository";
import { Student } from "../models/Student";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";

export class StudentRepository implements IRepository<Student> {
  private static instance: StudentRepository;
  private students: Map<string, Student> = new Map();
  private logger: ILogger;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): StudentRepository {
    if (!StudentRepository.instance) {
      StudentRepository.instance = new StudentRepository();
    }
    return StudentRepository.instance;
  }

  save(student: Student): void {
    this.students.set(student.id, student);
    this.logger.log(`Student ${student.id} saved to repository.`);
  }

  findById(id: string): Student | undefined {
    return this.students.get(id);
  }

  findAll(): Student[] {
    return Array.from(this.students.values());
  }

  delete(id: string): boolean {
    const result = this.students.delete(id);
    if (result) {
      this.logger.log(`Student ${id} removed from repository.`);
    }
    return result;
  }
}
