"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const VirtualClassroomManager_1 = require("./VirtualClassroomManager");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const manager = new VirtualClassroomManager_1.VirtualClassroomManager();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add CSP headers
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';");
    next();
});
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// API Routes - all the same as before...
// API Routes
// Classroom routes
app.get("/api/classrooms", (req, res) => {
    try {
        const classroomsData = manager.processCommand("list_classrooms");
        // Parse the response to extract classrooms
        const classrooms = parseClassroomsResponse(classroomsData);
        res.json(classrooms);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/api/classrooms", (req, res) => {
    try {
        const { name } = req.body;
        const result = manager.processCommand(`add_classroom ${name}`);
        res.json({ success: true, message: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.delete("/api/classrooms/:name", (req, res) => {
    try {
        const { name } = req.params;
        const result = manager.processCommand(`remove_classroom ${name}`);
        res.json({ success: true, message: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Student routes
app.get("/api/students", (req, res) => {
    try {
        const studentsData = manager.processCommand("list_students");
        // Parse the response to extract students
        const students = parseStudentsResponse(studentsData);
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/api/students", (req, res) => {
    try {
        const { id, classroomName } = req.body;
        const result = manager.processCommand(`add_student ${id} ${classroomName}`);
        res.json({ success: true, message: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get("/api/classrooms/:name/students", (req, res) => {
    try {
        const { name } = req.params;
        const studentsData = manager.processCommand(`list_students_in_classroom ${name}`);
        // Parse the response to extract students
        const students = parseStudentsInClassroomResponse(studentsData);
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Assignment routes
app.get("/api/assignments", (req, res) => {
    try {
        const assignmentsData = manager.processCommand("list_assignments");
        // Parse the response to extract assignments
        const assignments = parseAssignmentsResponse(assignmentsData);
        res.json(assignments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/api/assignments", (req, res) => {
    try {
        const { className, details } = req.body;
        const result = manager.processCommand(`schedule_assignment ${className} ${details}`);
        res.json({ success: true, message: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.post("/api/assignments/submit", (req, res) => {
    try {
        const { studentId, className, assignmentDetails } = req.body;
        const result = manager.processCommand(`submit_assignment ${studentId} ${className} ${assignmentDetails}`);
        res.json({ success: true, message: result });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get("/api/classrooms/:name/assignments", (req, res) => {
    try {
        const { name } = req.params;
        const assignmentsData = manager.processCommand(`list_assignments_for_classroom ${name}`);
        // Parse the response to extract assignments
        const assignments = parseAssignmentsResponse(assignmentsData);
        res.json(assignments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Serve the index.html for any other routes - Fixed wildcard route
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Helper functions to parse text responses into JSON
function parseClassroomsResponse(response) {
    if (response.includes("No classrooms available")) {
        return [];
    }
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    // Skip the header line
    const classroomLines = lines.slice(1);
    return classroomLines
        .map((line) => {
        const match = line.match(/- (.+) \(Students: (\d+), Assignments: (\d+)\)/);
        if (match) {
            return {
                name: match[1],
                students: [],
                assignments: [],
                studentCount: parseInt(match[2]),
                assignmentCount: parseInt(match[3]),
            };
        }
        return null;
    })
        .filter(Boolean);
}
function parseStudentsResponse(response) {
    if (response.includes("No students available")) {
        return [];
    }
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    // Skip the header line
    const studentLines = lines.slice(1);
    return studentLines
        .map((line) => {
        const match = line.match(/- (.+) \(Enrolled in: (.+)\)/);
        if (match) {
            return {
                id: match[1],
                classrooms: match[2] === "None" ? [] : match[2].split(", "),
            };
        }
        return null;
    })
        .filter(Boolean);
}
function parseStudentsInClassroomResponse(response) {
    if (response.includes("No students found")) {
        return [];
    }
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    // Skip the header line
    const studentLines = lines.slice(1);
    return studentLines
        .map((line) => {
        const match = line.match(/- (.+)/);
        if (match) {
            return {
                id: match[1],
                classrooms: [], // We don't have this info in this response
            };
        }
        return null;
    })
        .filter(Boolean);
}
function parseAssignmentsResponse(response) {
    if (response.includes("No assignments available")) {
        return [];
    }
    const lines = response.split("\n").filter((line) => line.trim() !== "");
    // Skip the header line
    const assignmentLines = lines.slice(1);
    return assignmentLines
        .map((line) => {
        const match = line.match(/- (.+): (.+) \(Class: (.+), Submissions: (\d+)\)/);
        if (match) {
            return {
                id: match[1],
                details: match[2],
                className: match[3],
                submissions: new Map(), // We don't have submission details in this response
            };
        }
        return null;
    })
        .filter(Boolean);
}
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Open your browser and navigate to http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map