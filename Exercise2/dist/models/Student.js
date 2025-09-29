"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(id) {
        this._classrooms = []; // Store classroom names
        this._id = id;
    }
    get id() {
        return this._id;
    }
    get classrooms() {
        return [...this._classrooms]; // Return a copy
    }
    enrollInClassroom(classroomName) {
        if (!this._classrooms.includes(classroomName)) {
            this._classrooms.push(classroomName);
        }
    }
    leaveClassroom(classroomName) {
        const index = this._classrooms.indexOf(classroomName);
        if (index !== -1) {
            this._classrooms.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map