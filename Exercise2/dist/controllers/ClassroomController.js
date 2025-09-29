"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomController = void 0;
const ClassroomService_1 = require("../services/ClassroomService");
const Logger_1 = require("../utils/Logger");
class ClassroomController {
    constructor() {
        this.classroomService = new ClassroomService_1.ClassroomService();
        this.logger = Logger_1.Logger.getInstance();
    }
    addClassroom(name) {
        try {
            this.classroomService.addClassroom(name);
            return `Classroom ${name} has been created.`;
        }
        catch (error) {
            this.logger.error(`Error adding classroom: ${error.message}`);
            throw error;
        }
    }
    listClassrooms() {
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
        }
        catch (error) {
            this.logger.error(`Error listing classrooms: ${error.message}`);
            throw error;
        }
    }
    removeClassroom(name) {
        try {
            const success = this.classroomService.removeClassroom(name);
            if (success) {
                return `Classroom ${name} has been removed.`;
            }
            else {
                return `Classroom ${name} not found.`;
            }
        }
        catch (error) {
            this.logger.error(`Error removing classroom: ${error.message}`);
            throw error;
        }
    }
}
exports.ClassroomController = ClassroomController;
//# sourceMappingURL=ClassroomController.js.map