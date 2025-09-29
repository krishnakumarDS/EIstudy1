export class Assignment {
  private _id: string;
  private _className: string;
  private _details: string;
  private _submissions: Map<string, boolean> = new Map(); // studentId -> submission status

  constructor(id: string, className: string, details: string) {
    this._id = id;
    this._className = className;
    this._details = details;
  }

  get id(): string {
    return this._id;
  }

  get className(): string {
    return this._className;
  }

  get details(): string {
    return this._details;
  }

  get submissions(): Map<string, boolean> {
    return new Map(this._submissions); // Return a copy
  }

  submitAssignment(studentId: string): boolean {
    if (!this._submissions.has(studentId)) {
      this._submissions.set(studentId, true);
      return true;
    }
    return false; // Already submitted
  }

  isSubmittedBy(studentId: string): boolean {
    return this._submissions.get(studentId) || false;
  }
}
