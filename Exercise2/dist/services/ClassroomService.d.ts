import { IClassroomService } from "../interfaces/IClassroomService";
import { Classroom } from "../models/Classroom";
export declare class ClassroomService implements IClassroomService {
    private classroomRepository;
    private studentRepository;
    private logger;
    private errorHandler;
    constructor();
    addClassroom(name: string): Classroom;
    getClassroom(name: string): Classroom | undefined;
    getAllClassrooms(): Classroom[];
    removeClassroom(name: string): boolean;
}
//# sourceMappingURL=ClassroomService.d.ts.map