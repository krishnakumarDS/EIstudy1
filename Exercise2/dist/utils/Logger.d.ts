import { ILogger } from "../interfaces/ILogger";
export declare class Logger implements ILogger {
    private static instance;
    private constructor();
    static getInstance(): Logger;
    log(message: string): void;
    error(message: string, error?: Error): void;
}
//# sourceMappingURL=Logger.d.ts.map