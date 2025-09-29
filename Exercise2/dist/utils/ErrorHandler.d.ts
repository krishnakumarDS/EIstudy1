export declare class ErrorHandler {
    private static instance;
    private logger;
    private constructor();
    static getInstance(): ErrorHandler;
    handle(error: unknown, customMessage?: string): void;
    handleWithRetry<T>(operation: () => T, maxRetries?: number, delayMs?: number): T;
    private sleep;
}
//# sourceMappingURL=ErrorHandler.d.ts.map