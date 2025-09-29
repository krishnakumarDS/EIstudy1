export class Student {
  private _id: string;
  private _classrooms: string[] = []; // Store classroom names

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get classrooms(): string[] {
    return [...this._classrooms]; // Return a copy
  }

  enrollInClassroom(classroomName: string): void {
    if (!this._classrooms.includes(classroomName)) {
      this._classrooms.push(classroomName);
    }
  }

  leaveClassroom(classroomName: string): boolean {
    const index = this._classrooms.indexOf(classroomName);
    if (index !== -1) {
      this._classrooms.splice(index, 1);
      return true;
    }
    return false;
  }
}
