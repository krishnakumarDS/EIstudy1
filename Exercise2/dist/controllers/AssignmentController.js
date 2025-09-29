"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentController = void 0;
const AssignmentService_1 = require("../services/AssignmentService");
const Logger_1 = require("../utils/Logger");
class AssignmentController {
    constructor() {
        this.assignmentService = new AssignmentService_1.AssignmentService();
        this.logger = Logger_1.Logger.getInstance();
    }
    scheduleAssignment(className, details) {
        try {
            this.assignmentService.scheduleAssignment(className, details);
            return `Assignment for ${className} has been scheduled.`;
        }
        catch (error) {
            this.logger.error(`Error scheduling assignment: ${error.message}`);
            throw error;
        }
    }
    submitAssignment(studentId, className, assignmentDetails) {
        try {
            const success = this.assignmentService.submitAssignment(studentId, className, assignmentDetails);
            if (success) {
                return `Assignment submitted by Student ${studentId} in ${className}.`;
            }
            else {
                return `Failed to submit assignment for Student ${studentId} in ${className}.`;
            }
        }
        catch (error) {
            this.logger.error(`Error submitting assignment: ${error.message}`);
            throw error;
        }
    }
    listAssignments() {
        try {
            const assignments = this.assignmentService.getAllAssignments();
            if (assignments.length === 0) {
                return "No assignments available.";
            }
            let result = "Available Assignments:\n";
            assignments.forEach((assignment) => {
                result += `- ${assignment.id}: ${assignment.details} (Class: ${assignment.className}, Submissions: ${assignment.submissions.size})\n`;
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Error listing assignments: ${error.message}`);
            throw error;
        }
    }
    listAssignmentsForClassroom(className) {
        try {
            const assignments = this.assignmentService.getAllAssignments();
            const assignmentsForClassroom = assignments.filter((assignment) => assignment.className === className);
            if (assignmentsForClassroom.length === 0) {
                return `No assignments found for classroom ${className}.`;
            }
            let result = `Assignments for Classroom ${className}:\n`;
            assignmentsForClassroom.forEach((assignment) => {
                result += `- ${assignment.id}: ${assignment.details} (Submissions: ${assignment.submissions.size})\n`;
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Error listing assignments for classroom: ${error.message}`);
            throw error;
        }
    }
}
exports.AssignmentController = AssignmentController;
//# sourceMappingURL=AssignmentController.js.map