"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const VirtualClassroomManager_1 = require("./VirtualClassroomManager");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const manager = new VirtualClassroomManager_1.VirtualClassroomManager();
console.log("Virtual Classroom Manager");
console.log("Type 'help' for available commands or 'exit' to quit.");
function promptUser() {
    rl.question("> ", (input) => {
        if (input.trim().toLowerCase() === "exit") {
            rl.close();
            return;
        }
        try {
            const result = manager.processCommand(input);
            console.log(result);
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
        promptUser();
    });
}
promptUser();
rl.on("close", () => {
    console.log("Exiting Virtual Classroom Manager. Goodbye!");
    process.exit(0);
});
//# sourceMappingURL=main.js.map