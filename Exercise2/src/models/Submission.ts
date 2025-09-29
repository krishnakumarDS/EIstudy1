export class Submission {
  private _studentId: string;
  private _className: string;
  private _assignmentDetails: string;
  private _timestamp: Date;

  constructor(studentId: string, className: string, assignmentDetails: string) {
    this._studentId = studentId;
    this._className = className;
    this._assignmentDetails = assignmentDetails;
    this._timestamp = new Date();
  }

  get studentId(): string {
    return this._studentId;
  }

  get className(): string {
    return this._className;
  }

  get assignmentDetails(): string {
    return this._assignmentDetails;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
