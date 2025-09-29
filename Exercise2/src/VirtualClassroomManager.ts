import { ClassroomController } from "./controllers/ClassroomController";
import { StudentController } from "./controllers/StudentController";
import { AssignmentController } from "./controllers/AssignmentController";
import { ILogger } from "./interfaces/ILogger";
import { Logger } from "./utils/Logger";
import { ErrorHandler } from "./utils/ErrorHandler";

export class VirtualClassroomManager {
  private classroomController: ClassroomController;
  private studentController: StudentController;
  private assignmentController: AssignmentController;
  private logger: ILogger;
  private errorHandler: ErrorHandler;

  constructor() {
    this.classroomController = new ClassroomController();
    this.studentController = new StudentController();
    this.assignmentController = new AssignmentController();
    this.logger = Logger.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
  }

  processCommand(command: string): string {
    try {
      const parts = command.trim().split(" ");
      const action = parts[0];

      switch (action) {
        case "add_classroom":
          if (parts.length < 2) {
            return "Error: Classroom name is required.";
          }
          const className = parts.slice(1).join(" ");
          return this.classroomController.addClassroom(className);

        case "add_student":
          if (parts.length < 3) {
            return "Error: Student ID and classroom name are required.";
          }
          const studentId = parts[1];
          const studentClassroom = parts.slice(2).join(" ");
          return this.studentController.enrollStudent(
            studentId,
            studentClassroom
          );

        case "schedule_assignment":
          if (parts.length < 3) {
            return "Error: Class name and assignment details are required.";
          }
          const assignmentClass = parts[1];
          const assignmentDetails = parts.slice(2).join(" ");
          return this.assignmentController.scheduleAssignment(
            assignmentClass,
            assignmentDetails
          );

        case "submit_assignment":
          if (parts.length < 4) {
            return "Error: Student ID, class name, and assignment details are required.";
          }
          const submitStudentId = parts[1];
          const submitClass = parts[2];
          const submitDetails = parts.slice(3).join(" ");
          return this.assignmentController.submitAssignment(
            submitStudentId,
            submitClass,
            submitDetails
          );

        case "list_classrooms":
          return this.classroomController.listClassrooms();

        case "list_students":
          return this.studentController.listStudents();

        case "list_students_in_classroom":
          if (parts.length < 2) {
            return "Error: Classroom name is required.";
          }
          const listClassroom = parts.slice(1).join(" ");
          return this.studentController.listStudentsInClassroom(listClassroom);

        case "list_assignments":
          return this.assignmentController.listAssignments();

        case "list_assignments_for_classroom":
          if (parts.length < 2) {
            return "Error: Classroom name is required.";
          }
          const listAssignmentClass = parts.slice(1).join(" ");
          return this.assignmentController.listAssignmentsForClassroom(
            listAssignmentClass
          );

        case "help":
          return this.getHelpText();

        case "exit":
          return "Exiting Virtual Classroom Manager. Goodbye!";

        default:
          return `Unknown command: ${action}. Type 'help' for available commands.`;
      }
    } catch (error) {
      this.errorHandler.handle(
        error as Error,
        `Error processing command: ${command}`
      );
      return `Error: ${(error as Error).message}`;
    }
  }

  private getHelpText(): string {
    return `
Virtual Classroom Manager - Available Commands:

Classroom Management:
  add_classroom [name]               - Create a new classroom
  list_classrooms                    - List all classrooms

Student Management:
  add_student [id] [class name]      - Enroll a student in a classroom
  list_students                      - List all students
  list_students_in_classroom [name]  - List students in a specific classroom

Assignment Management:
  schedule_assignment [class] [details] - Schedule an assignment for a class
  submit_assignment [id] [class] [details] - Submit an assignment
  list_assignments                   - List all assignments
  list_assignments_for_classroom [name] - List assignments for a specific classroom

Other:
  help                               - Show this help message
  exit                               - Exit the application
        `;
  }
}
