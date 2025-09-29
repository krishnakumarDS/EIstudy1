import { Classroom } from "../models/Classroom";

export interface IClassroomService {
  addClassroom(name: string): Classroom;
  getClassroom(name: string): Classroom | undefined;
  getAllClassrooms(): Classroom[];
  removeClassroom(name: string): boolean;
}
