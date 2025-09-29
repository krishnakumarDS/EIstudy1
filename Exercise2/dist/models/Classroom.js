"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classroom = void 0;
class Classroom {
    constructor(name) {
        this._students = []; // Store student IDs
        this._assignments = []; // Store assignment IDs
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get students() {
        return [...this._students]; // Return a copy
    }
    get assignments() {
        return [...this._assignments]; // Return a copy
    }
    addStudent(studentId) {
        if (!this._students.includes(studentId)) {
            this._students.push(studentId);
        }
    }
    removeStudent(studentId) {
        const index = this._students.indexOf(studentId);
        if (index !== -1) {
            this._students.splice(index, 1);
            return true;
        }
        return false;
    }
    addAssignment(assignmentId) {
        if (!this._assignments.includes(assignmentId)) {
            this._assignments.push(assignmentId);
        }
    }
    removeAssignment(assignmentId) {
        const index = this._assignments.indexOf(assignmentId);
        if (index !== -1) {
            this._assignments.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.Classroom = Classroom;
//# sourceMappingURL=Classroom.js.map