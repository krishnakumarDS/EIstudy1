"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submission = void 0;
class Submission {
    constructor(studentId, className, assignmentDetails) {
        this._studentId = studentId;
        this._className = className;
        this._assignmentDetails = assignmentDetails;
        this._timestamp = new Date();
    }
    get studentId() {
        return this._studentId;
    }
    get className() {
        return this._className;
    }
    get assignmentDetails() {
        return this._assignmentDetails;
    }
    get timestamp() {
        return this._timestamp;
    }
}
exports.Submission = Submission;
//# sourceMappingURL=Submission.js.map