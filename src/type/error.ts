export type ApiError = {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
};

export function clientError(message: string): ApiError {
    return {
        timestamp: new Date().toISOString(),
        status: 0,
        error: "Validation",
        message,
        path: "/files/upload",
    };
}