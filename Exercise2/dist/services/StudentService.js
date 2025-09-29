"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const Student_1 = require("../models/Student");
const StudentRepository_1 = require("../repositories/StudentRepository");
const ClassroomRepository_1 = require("../repositories/ClassroomRepository");
const Logger_1 = require("../utils/Logger");
const ErrorHandler_1 = require("../utils/ErrorHandler");
class StudentService {
    constructor() {
        this.studentRepository = StudentRepository_1.StudentRepository.getInstance();
        this.classroomRepository = ClassroomRepository_1.ClassroomRepository.getInstance();
        this.logger = Logger_1.Logger.getInstance();
        this.errorHandler = ErrorHandler_1.ErrorHandler.getInstance();
    }
    addStudent(id) {
        try {
            // Check if student already exists
            const existingStudent = this.studentRepository.findById(id);
            if (existingStudent) {
                throw new Error(`Student with ID ${id} already exists`);
            }
            const student = new Student_1.Student(id);
            this.studentRepository.save(student);
            this.logger.log(`Student ${id} created successfully`);
            return student;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to add student ${id}`);
            throw error;
        }
    }
    getStudent(id) {
        try {
            return this.studentRepository.findById(id);
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to get student ${id}`);
            throw error;
        }
    }
    getAllStudents() {
        try {
            return this.studentRepository.findAll();
        }
        catch (error) {
            this.errorHandler.handle(error, "Failed to get all students");
            throw error;
        }
    }
    enrollStudent(studentId, classroomName) {
        try {
            const student = this.studentRepository.findById(studentId);
            if (!student) {
                throw new Error(`Student ${studentId} not found`);
            }
            const classroom = this.classroomRepository.findById(classroomName);
            if (!classroom) {
                throw new Error(`Classroom ${classroomName} not found`);
            }
            // Enroll student in classroom
            student.enrollInClassroom(classroomName);
            classroom.addStudent(studentId);
            // Save changes
            this.studentRepository.save(student);
            this.classroomRepository.save(classroom);
            this.logger.log(`Student ${studentId} enrolled in classroom ${classroomName}`);
            return true;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to enroll student ${studentId} in classroom ${classroomName}`);
            throw error;
        }
    }
    removeStudent(id) {
        try {
            const student = this.studentRepository.findById(id);
            if (!student) {
                throw new Error(`Student ${id} not found`);
            }
            // Remove student from all classrooms
            student.classrooms.forEach((classroomName) => {
                const classroom = this.classroomRepository.findById(classroomName);
                if (classroom) {
                    classroom.removeStudent(id);
                    this.classroomRepository.save(classroom);
                }
            });
            // Delete the student
            const result = this.studentRepository.delete(id);
            this.logger.log(`Student ${id} removed successfully`);
            return result;
        }
        catch (error) {
            this.errorHandler.handle(error, `Failed to remove student ${id}`);
            throw error;
        }
    }
}
exports.StudentService = StudentService;
//# sourceMappingURL=StudentService.js.map