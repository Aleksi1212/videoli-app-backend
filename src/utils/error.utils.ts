class RouteError extends Error {
    statusCode: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default RouteError;
