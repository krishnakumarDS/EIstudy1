import { IRepository } from "../interfaces/IRepository";
import { Assignment } from "../models/Assignment";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";

export class AssignmentRepository implements IRepository<Assignment> {
  private static instance: AssignmentRepository;
  private assignments: Map<string, Assignment> = new Map();
  private logger: ILogger;
  private idCounter: number = 1;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): AssignmentRepository {
    if (!AssignmentRepository.instance) {
      AssignmentRepository.instance = new AssignmentRepository();
    }
    return AssignmentRepository.instance;
  }

  save(assignment: Assignment): void {
    this.assignments.set(assignment.id, assignment);
    this.logger.log(`Assignment ${assignment.id} saved to repository.`);
  }

  findById(id: string): Assignment | undefined {
    return this.assignments.get(id);
  }

  findAll(): Assignment[] {
    return Array.from(this.assignments.values());
  }

  delete(id: string): boolean {
    const result = this.assignments.delete(id);
    if (result) {
      this.logger.log(`Assignment ${id} removed from repository.`);
    }
    return result;
  }

  generateId(): string {
    return `assignment_${this.idCounter++}`;
  }
}
