import { Request, Response, NextFunction } from 'express';

import {
    getGoogleOauthTokens,
    getGoogleUserData,
} from '../services/googleOauth.service';
import { findOrCreateUser } from '../services/user.service';
import RouteError from '../utils/error.utils';

async function googleOauthHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
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

        res.json(userData);
    } catch (error: any) {
        customError = new RouteError(error.message, 500);
        next(customError);
    }
}

export { googleOauthHandler };
