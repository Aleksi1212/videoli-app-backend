import { Request, Response, NextFunction } from 'express';

function errorCatcher(
    err: RouteError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err) {
        const status = err.statusCode || 500;
        const message = err.message || 'Internal server error';
        res.status(status).json({ error: message });
    } else {
        next();
    }
}

export default errorCatcher;
