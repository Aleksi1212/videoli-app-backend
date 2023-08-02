import { Request, Response, NextFunction } from 'express';

import {
    getGoogleOauthTokens,
    getGoogleUserData,
} from '../services/googleOauth.service';

async function googleOauthHandler(req: Request, res: Response, next: NextFunction) {
    const googleOauthCode = req.query.code as string;

    try {
        const { id_token, access_token } = await getGoogleOauthTokens(googleOauthCode);
        console.log({ id_token, access_token });
    
        const googleUser = await getGoogleUserData({ id_token, access_token });
        console.log(googleUser);
    
        res.json({
            tokens: {
                id_token,
                access_token
            },
            userData: {
                googleUser
            }
        })
    } catch(error: any) {
        next(error)
    }
}

export { googleOauthHandler };
