"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomRepository = void 0;
const Logger_1 = require("../utils/Logger");
class ClassroomRepository {
    constructor() {
        this.classrooms = new Map();
        this.logger = Logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (!ClassroomRepository.instance) {
            ClassroomRepository.instance = new ClassroomRepository();
        }
        return ClassroomRepository.instance;
    }
    save(classroom) {
        this.classrooms.set(classroom.name, classroom);
        this.logger.log(`Classroom ${classroom.name} saved to repository.`);
    }
    findById(name) {
        return this.classrooms.get(name);
    }
    findAll() {
        return Array.from(this.classrooms.values());
    }
    delete(name) {
        const result = this.classrooms.delete(name);
        if (result) {
            this.logger.log(`Classroom ${name} removed from repository.`);
        }
        return result;
    }
}
exports.ClassroomRepository = ClassroomRepository;
//# sourceMappingURL=ClassroomRepository.js.map