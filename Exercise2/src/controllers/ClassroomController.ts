import { IClassroomService } from "../interfaces/IClassroomService";
import { ClassroomService } from "../services/ClassroomService";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";

export class ClassroomController {
  private classroomService: IClassroomService;
  private logger: ILogger;

  constructor() {
    this.classroomService = new ClassroomService();
    this.logger = Logger.getInstance();
  }

  addClassroom(name: string): string {
    try {
      this.classroomService.addClassroom(name);
      return `Classroom ${name} has been created.`;
    } catch (error) {
      this.logger.error(`Error adding classroom: ${(error as Error).message}`);
      throw error;
    }
  }

  listClassrooms(): string {
    try {
      const classrooms = this.classroomService.getAllClassrooms();
      if (classrooms.length === 0) {
        return "No classrooms available.";
      }

      let result = "Available Classrooms:\n";
      classrooms.forEach((classroom) => {
        result += `- ${classroom.name} (Students: ${classroom.students.length}, Assignments: ${classroom.assignments.length})\n`;
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Error listing classrooms: ${(error as Error).message}`
      );
      throw error;
    }
  }

  removeClassroom(name: string): string {
    try {
      const success = this.classroomService.removeClassroom(name);
      if (success) {
        return `Classroom ${name} has been removed.`;
      } else {
        return `Classroom ${name} not found.`;
      }
    } catch (error) {
      this.logger.error(
        `Error removing classroom: ${(error as Error).message}`
      );
      throw error;
    }
  }
}
