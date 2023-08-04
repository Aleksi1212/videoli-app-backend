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
    let error: RouteErrorTypes;

    try {
        const { id_token, access_token } = await getGoogleOauthTokens(
            googleOauthCode
        );
        const googleUser = await getGoogleUserData({ id_token, access_token });
        if (!googleUser.verified_email) {
            error = new RouteError('Google account not verified', 403);
            return next(error);
        }

        const userData = await findOrCreateUser({
            email: googleUser.email,
            name: `${googleUser.given_name} ${googleUser.family_name}`,
            profilePicture: googleUser.picture,
        });
        if (!userData) {
            error = new RouteError('Error creating user', 500);
            return next(error);
        }

        res.json(userData);
    } catch (error: any) {
        next(error);
    }
}

export { googleOauthHandler };
