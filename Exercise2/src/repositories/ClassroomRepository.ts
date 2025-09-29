import { IRepository } from "../interfaces/IRepository";
import { Classroom } from "../models/Classroom";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";

export class ClassroomRepository implements IRepository<Classroom> {
  private static instance: ClassroomRepository;
  private classrooms: Map<string, Classroom> = new Map();
  private logger: ILogger;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): ClassroomRepository {
    if (!ClassroomRepository.instance) {
      ClassroomRepository.instance = new ClassroomRepository();
    }
    return ClassroomRepository.instance;
  }

  save(classroom: Classroom): void {
    this.classrooms.set(classroom.name, classroom);
    this.logger.log(`Classroom ${classroom.name} saved to repository.`);
  }

  findById(name: string): Classroom | undefined {
    return this.classrooms.get(name);
  }

  findAll(): Classroom[] {
    return Array.from(this.classrooms.values());
  }

  delete(name: string): boolean {
    const result = this.classrooms.delete(name);
    if (result) {
      this.logger.log(`Classroom ${name} removed from repository.`);
    }
    return result;
  }
}
