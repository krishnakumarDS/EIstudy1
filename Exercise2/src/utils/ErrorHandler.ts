import { Logger } from "./Logger";

export class ErrorHandler {
  private static instance: ErrorHandler;
  private logger: Logger;

  private constructor() {
    this.logger = Logger.getInstance();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  handle(error: unknown, customMessage?: string): void {
    // Safely extract error message from unknown error type
    const errorMessage = error instanceof Error ? error.message : String(error);
    const message = customMessage || `An error occurred: ${errorMessage}`;

    // Only pass Error object to logger.error, not unknown types
    this.logger.error(message, error instanceof Error ? error : undefined);
  }

  handleWithRetry<T>(
    operation: () => T,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): T {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return operation();
      } catch (error) {
        lastError = error;

        // Safely extract error message for logging
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        this.logger.error(`Attempt ${attempt} failed: ${errorMessage}`);

        if (attempt < maxRetries) {
          this.logger.log(`Retrying in ${delayMs}ms...`);
          this.sleep(delayMs);
        }
      }
    }

    throw lastError!;
  }

  private sleep(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // Busy wait for simplicity
    }
  }
}
