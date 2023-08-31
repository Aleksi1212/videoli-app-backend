import { Request, Response, NextFunction } from 'express';

import { signJwt, verifyJwt } from '../utils/jwt.utils';
import RouteError from '../utils/error.utils';
import config from '../config/app.config';

function getAccessTokenHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let customError: RouteErrorTypes;
    const refreshToken = req.cookies.refreshToken as string;
    const sessionId = req.sessionID;

    const { valid, decodedJwt } = verifyJwt(refreshToken);
    if (!valid) {
        customError = new RouteError('Refresh-token expired or invalid', 401);
        return next(customError);
    }
    if (sessionId !== decodedJwt.session) {
        customError = new RouteError('Invalid refresh-token', 401);
        return next(customError);
    }

    const { iat, exp, ...jwtData } = decodedJwt;
    const accessToken = signJwt(jwtData, {
        expiresIn: config.accessTokenTtl,
    });
    res.status(201).json({ accessToken });
}

export default getAccessTokenHandler;
