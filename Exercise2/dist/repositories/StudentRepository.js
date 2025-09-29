"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
const Logger_1 = require("../utils/Logger");
class StudentRepository {
    constructor() {
        this.students = new Map();
        this.logger = Logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (!StudentRepository.instance) {
            StudentRepository.instance = new StudentRepository();
        }
        return StudentRepository.instance;
    }
    save(student) {
        this.students.set(student.id, student);
        this.logger.log(`Student ${student.id} saved to repository.`);
    }
    findById(id) {
        return this.students.get(id);
    }
    findAll() {
        return Array.from(this.students.values());
    }
    delete(id) {
        const result = this.students.delete(id);
        if (result) {
            this.logger.log(`Student ${id} removed from repository.`);
        }
        return result;
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=StudentRepository.js.map