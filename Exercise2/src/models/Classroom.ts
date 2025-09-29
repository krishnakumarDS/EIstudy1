export class Classroom {
  private _name: string;
  private _students: string[] = []; // Store student IDs
  private _assignments: string[] = []; // Store assignment IDs

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get students(): string[] {
    return [...this._students]; // Return a copy
  }

  get assignments(): string[] {
    return [...this._assignments]; // Return a copy
  }

  addStudent(studentId: string): void {
    if (!this._students.includes(studentId)) {
      this._students.push(studentId);
    }
  }

  removeStudent(studentId: string): boolean {
    const index = this._students.indexOf(studentId);
    if (index !== -1) {
      this._students.splice(index, 1);
      return true;
    }
    return false;
  }

  addAssignment(assignmentId: string): void {
    if (!this._assignments.includes(assignmentId)) {
      this._assignments.push(assignmentId);
    }
  }

  removeAssignment(assignmentId: string): boolean {
    const index = this._assignments.indexOf(assignmentId);
    if (index !== -1) {
      this._assignments.splice(index, 1);
      return true;
    }
    return false;
  }
}
