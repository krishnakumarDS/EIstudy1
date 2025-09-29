"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentService = void 0;
const Assignment_1 = require("../models/Assignment");
const AssignmentRepository_1 = require("../repositories/AssignmentRepository");
const ClassroomRepository_1 = require("../repositories/ClassroomRepository");
const StudentRepository_1 = require("../repositories/StudentRepository");
const Logger_1 = require("../utils/Logger");
const ErrorHandler_1 = require("../utils/ErrorHandler");
class AssignmentService {
    constructor() {
        this.assignmentRepository = AssignmentRepository_1.AssignmentRepository.getInstance();
        this.classroomRepository = ClassroomRepository_1.ClassroomRepository.getInstance();
        this.studentRepository = StudentRepository_1.StudentRepository.getInstance();
        this.logger = Logger_1.Logger.getInstance();
        this.errorHandler = ErrorHandler_1.ErrorHandler.getInstance();
    }
    scheduleAssignment(className, details) {
        try {
            const classroom = this.classroomRepository.findById(className);
            if (!classroom) {
                throw new Error(`Classroom ${className} not found`);
            }
            const assignmentId = this.assignmentRepository.generateId();
            const assignment = new Assignment_1.Assignment(assignmentId, className, details);
            this.assignmentRepository.save(assignment);
            classroom.addAssignment(assignmentId);
            this.classroomRepository.save(classroom);
            this.logger.log(`Assignment scheduled for classroom ${className}`);
            return assignment;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to schedule assignment for classroom ${className}`);
            throw error;
        }
    }
    getAssignment(id) {
        try {
            return this.assignmentRepository.findById(id);
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to get assignment ${id}`);
            throw error;
        }
    }
    getAllAssignments() {
        try {
            return this.assignmentRepository.findAll();
        }
        catch (error) {
            this.errorHandler.handle(error, "Failed to get all assignments");
            throw error;
        }
    }
    submitAssignment(studentId, className, assignmentDetails) {
        try {
            const student = this.studentRepository.findById(studentId);
            if (!student) {
                throw new Error(`Student ${studentId} not found`);
            }
            const classroom = this.classroomRepository.findById(className);
            if (!classroom) {
                throw new Error(`Classroom ${className} not found`);
            }
            // Check if student is enrolled in the classroom
            if (!student.classrooms.includes(className)) {
                throw new Error(`Student ${studentId} is not enrolled in classroom ${className}`);
            }
            // Find the assignment by details (in a real system, we would use assignment ID)
            const assignments = this.assignmentRepository.findAll();
            const assignment = assignments.find((a) => a.className === className && a.details === assignmentDetails);
            if (!assignment) {
                throw new Error(`Assignment not found for classroom ${className} with specified details`);
            }
            // Submit the assignment
            const result = assignment.submitAssignment(studentId);
            if (result) {
                this.assignmentRepository.save(assignment);
                this.logger.log(`Assignment submitted by student ${studentId} in classroom ${className}`);
            }
            return result;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to submit assignment for student ${studentId} in classroom ${className}`);
            throw error;
        }
    }
    removeAssignment(id) {
        try {
            const assignment = this.assignmentRepository.findById(id);
            if (!assignment) {
                throw new Error(`Assignment ${id} not found`);
            }
            // Remove assignment from classroom
            const classroom = this.classroomRepository.findById(assignment.className);
            if (classroom) {
                classroom.removeAssignment(id);
                this.classroomRepository.save(classroom);
            }
            // Delete the assignment
            const result = this.assignmentRepository.delete(id);
            this.logger.log(`Assignment ${id} removed successfully`);
            return result;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to remove assignment ${id}`);
            throw error;
        }
    }
}
exports.AssignmentService = AssignmentService;
//# sourceMappingURL=AssignmentService.js.map