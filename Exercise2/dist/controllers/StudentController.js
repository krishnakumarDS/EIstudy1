"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const StudentService_1 = require("../services/StudentService");
const Logger_1 = require("../utils/Logger");
class StudentController {
    constructor() {
        this.studentService = new StudentService_1.StudentService();
        this.logger = Logger_1.Logger.getInstance();
    }
    addStudent(id) {
        try {
            this.studentService.addStudent(id);
            return `Student ${id} has been created.`;
        }
        catch (error) {
            this.logger.error(`Error adding student: ${error.message}`);
            throw error;
        }
    }
    enrollStudent(studentId, classroomName) {
        try {
            const success = this.studentService.enrollStudent(studentId, classroomName);
            if (success) {
                return `Student ${studentId} has been enrolled in ${classroomName}.`;
            }
            else {
                return `Failed to enroll student ${studentId} in ${classroomName}.`;
            }
        }
        catch (error) {
            this.logger.error(`Error enrolling student: ${error.message}`);
            throw error;
        }
    }
    listStudents() {
        try {
            const students = this.studentService.getAllStudents();
            if (students.length === 0) {
                return "No students available.";
            }
            let result = "Available Students:\n";
            students.forEach((student) => {
                result += `- ${student.id} (Enrolled in: ${student.classrooms.join(", ") || "None"})\n`;
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Error listing students: ${error.message}`);
            throw error;
        }
    }
    listStudentsInClassroom(classroomName) {
        try {
            const students = this.studentService.getAllStudents();
            const studentsInClassroom = students.filter((student) => student.classrooms.includes(classroomName));
            if (studentsInClassroom.length === 0) {
                return `No students found in classroom ${classroomName}.`;
            }
            let result = `Students in Classroom ${classroomName}:\n`;
            studentsInClassroom.forEach((student) => {
                result += `- ${student.id}\n`;
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Error listing students in classroom: ${error.message}`);
            throw error;
        }
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=StudentController.js.map