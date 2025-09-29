"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentRepository = void 0;
const Logger_1 = require("../utils/Logger");
class AssignmentRepository {
    constructor() {
        this.assignments = new Map();
        this.idCounter = 1;
        this.logger = Logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (!AssignmentRepository.instance) {
            AssignmentRepository.instance = new AssignmentRepository();
        }
        return AssignmentRepository.instance;
    }
    save(assignment) {
        this.assignments.set(assignment.id, assignment);
        this.logger.log(`Assignment ${assignment.id} saved to repository.`);
    }
    findById(id) {
        return this.assignments.get(id);
    }
    findAll() {
        return Array.from(this.assignments.values());
    }
    delete(id) {
        const result = this.assignments.delete(id);
        if (result) {
            this.logger.log(`Assignment ${id} removed from repository.`);
        }
        return result;
    }
    generateId() {
        return `assignment_${this.idCounter++}`;
    }
}
exports.AssignmentRepository = AssignmentRepository;
//# sourceMappingURL=AssignmentRepository.js.map