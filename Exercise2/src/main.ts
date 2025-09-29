import * as readline from "readline";
import { VirtualClassroomManager } from "./VirtualClassroomManager";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const manager = new VirtualClassroomManager();

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
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
    }

    promptUser();
  });
}

promptUser();

rl.on("close", () => {
  console.log("Exiting Virtual Classroom Manager. Goodbye!");
  process.exit(0);
});
