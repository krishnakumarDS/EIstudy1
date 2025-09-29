"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const Logger_1 = require("./Logger");
class ErrorHandler {
    constructor() {
        this.logger = Logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }
    handle(error, customMessage) {
        // Safely extract error message from unknown error type
        const errorMessage = error instanceof Error ? error.message : String(error);
        const message = customMessage || `An error occurred: ${errorMessage}`;
        // Only pass Error object to logger.error, not unknown types
        this.logger.error(message, error instanceof Error ? error : undefined);
    }
    handleWithRetry(operation, maxRetries = 3, delayMs = 1000) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return operation();
            }
            catch (error) {
                lastError = error;
                // Safely extract error message for logging
                const errorMessage = error instanceof Error ? error.message : String(error);
                this.logger.error(`Attempt ${attempt} failed: ${errorMessage}`);
                if (attempt < maxRetries) {
                    this.logger.log(`Retrying in ${delayMs}ms...`);
                    this.sleep(delayMs);
                }
            }
        }
        throw lastError;
    }
    sleep(ms) {
        const start = Date.now();
        while (Date.now() - start < ms) {
            // Busy wait for simplicity
        }
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map