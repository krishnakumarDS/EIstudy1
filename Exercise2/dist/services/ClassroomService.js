"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomService = void 0;
const Classroom_1 = require("../models/Classroom");
const ClassroomRepository_1 = require("../repositories/ClassroomRepository");
const StudentRepository_1 = require("../repositories/StudentRepository");
const Logger_1 = require("../utils/Logger");
const ErrorHandler_1 = require("../utils/ErrorHandler");
class ClassroomService {
    constructor() {
        this.classroomRepository = ClassroomRepository_1.ClassroomRepository.getInstance();
        this.studentRepository = StudentRepository_1.StudentRepository.getInstance();
        this.logger = Logger_1.Logger.getInstance();
        this.errorHandler = ErrorHandler_1.ErrorHandler.getInstance();
    }
    addClassroom(name) {
        try {
            // Check if classroom already exists
            const existingClassroom = this.classroomRepository.findById(name);
            if (existingClassroom) {
                throw new Error(`Classroom with name ${name} already exists`);
            }
            const classroom = new Classroom_1.Classroom(name);
            this.classroomRepository.save(classroom);
            this.logger.log(`Classroom ${name} created successfully`);
            return classroom;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to add classroom ${name}`);
            throw error;
        }
    }
    getClassroom(name) {
        try {
            return this.classroomRepository.findById(name);
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to get classroom ${name}`);
            throw error;
        }
    }
    getAllClassrooms() {
        try {
            return this.classroomRepository.findAll();
        }
        catch (error) {
            this.errorHandler.handle(error, "Failed to get all classrooms");
            throw error;
        }
    }
    removeClassroom(name) {
        try {
            const classroom = this.classroomRepository.findById(name);
            if (!classroom) {
                throw new Error(`Classroom ${name} not found`);
            }
            // Remove classroom from all students
            const students = this.studentRepository.findAll();
            students.forEach((student) => {
                if (student.classrooms.includes(name)) {
                    student.leaveClassroom(name);
                    this.studentRepository.save(student);
                }
            });
            // Delete the classroom
            const result = this.classroomRepository.delete(name);
            this.logger.log(`Classroom ${name} removed successfully`);
            return result;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to remove classroom ${name}`);
            throw error;
        }
    }
}
exports.ClassroomService = ClassroomService;
//# sourceMappingURL=ClassroomService.js.map