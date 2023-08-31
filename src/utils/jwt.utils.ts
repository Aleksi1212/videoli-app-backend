import jwt from 'jsonwebtoken';
import config from '../config/app.config';

const jwtSecret = config.jwtSecret;

interface VerifyJwtReturntypes {
    valid: boolean;
    decodedJwt: any;
}

function signJwt(object: Object, options?: jwt.SignOptions): string {
    return jwt.sign(object, jwtSecret, {
        ...options,
        algorithm: 'HS256',
    });
}

function verifyJwt(token: string): VerifyJwtReturntypes {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return {
            valid: true,
            decodedJwt: decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            decodedJwt: {},
        };
    }
}

export { signJwt, verifyJwt };
