"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
class Assignment {
    constructor(id, className, details) {
        this._submissions = new Map(); // studentId -> submission status
        this._id = id;
        this._className = className;
        this._details = details;
    }
    get id() {
        return this._id;
    }
    get className() {
        return this._className;
    }
    get details() {
        return this._details;
    }
    get submissions() {
        return new Map(this._submissions); // Return a copy
    }
    submitAssignment(studentId) {
        if (!this._submissions.has(studentId)) {
            this._submissions.set(studentId, true);
            return true;
        }
        return false; // Already submitted
    }
    isSubmittedBy(studentId) {
        return this._submissions.get(studentId) || false;
    }
}
exports.Assignment = Assignment;
//# sourceMappingURL=Assignment.js.map