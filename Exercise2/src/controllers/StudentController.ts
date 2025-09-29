import { IStudentService } from "../interfaces/IStudentService";
import { StudentService } from "../services/StudentService";
import { ILogger } from "../interfaces/ILogger";
import { Logger } from "../utils/Logger";

export class StudentController {
  private studentService: IStudentService;
  private logger: ILogger;

  constructor() {
    this.studentService = new StudentService();
    this.logger = Logger.getInstance();
  }

  addStudent(id: string): string {
    try {
      this.studentService.addStudent(id);
      return `Student ${id} has been created.`;
    } catch (error) {
      this.logger.error(`Error adding student: ${(error as Error).message}`);
      throw error;
    }
  }

  enrollStudent(studentId: string, classroomName: string): string {
    try {
      const success = this.studentService.enrollStudent(
        studentId,
        classroomName
      );
      if (success) {
        return `Student ${studentId} has been enrolled in ${classroomName}.`;
      } else {
        return `Failed to enroll student ${studentId} in ${classroomName}.`;
      }
    } catch (error) {
      this.logger.error(`Error enrolling student: ${(error as Error).message}`);
      throw error;
    }
  }

  listStudents(): string {
    try {
      const students = this.studentService.getAllStudents();
      if (students.length === 0) {
        return "No students available.";
      }

      let result = "Available Students:\n";
      students.forEach((student) => {
        result += `- ${student.id} (Enrolled in: ${
          student.classrooms.join(", ") || "None"
        })\n`;
      });

      return result;
    } catch (error) {
      this.logger.error(`Error listing students: ${(error as Error).message}`);
      throw error;
    }
  }

  listStudentsInClassroom(classroomName: string): string {
    try {
      const students = this.studentService.getAllStudents();
      const studentsInClassroom = students.filter((student) =>
        student.classrooms.includes(classroomName)
      );

      if (studentsInClassroom.length === 0) {
        return `No students found in classroom ${classroomName}.`;
      }

      let result = `Students in Classroom ${classroomName}:\n`;
      studentsInClassroom.forEach((student) => {
        result += `- ${student.id}\n`;
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Error listing students in classroom: ${(error as Error).message}`
      );
      throw error;
    }
  }
}
