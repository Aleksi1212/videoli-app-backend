import { Request, Response, NextFunction } from 'express';

import {
    getGoogleOauthTokens,
    getGoogleUserData,
} from '../services/googleOauth.service';
import { findOrCreateUser } from '../services/user.service';

import RouteError from '../utils/error.utils';
import { signJwt } from '../utils/jwt.utils';
import generateId from '../utils/hash.utils';
import config from '../config/appConfig';
import { refreshTokenCookieOptions } from '../config/authConfig';

async function googleOauthHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const session = req.session;
    const googleOauthCode = req.query.code as string;
    let customError: RouteErrorTypes;

    try {
        const { id_token, access_token } = await getGoogleOauthTokens(
            googleOauthCode
        );
        const googleUser = await getGoogleUserData({ id_token, access_token });
        if (!googleUser.verified_email) {
            customError = new RouteError('Google account not verified', 403);
            return next(customError);
        }

        const userData = await findOrCreateUser({
            email: googleUser.email,
            name: `${googleUser.given_name} ${googleUser.family_name}`,
            profilePicture: googleUser.picture,
        });
        if (!userData) {
            customError = new RouteError('Error creating user', 500);
            return next(customError);
        }

        const { email, name } = userData;
        session.email = email;
        session.name = name;
        session.userId = generateId(email, 20);

        const refreshToken = signJwt(
            { ...userData, session: session.id },
            { expiresIn: config.refreshTokenTtl }
        );
        res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

        res.json(userData);
    } catch (error: any) {
        customError = new RouteError(error.message, 500);
        next(customError);
    }
}

export { googleOauthHandler };
