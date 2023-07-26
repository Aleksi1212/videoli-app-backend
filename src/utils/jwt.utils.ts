import jwt from 'jsonwebtoken';
import config from '../config/appConfig';

const jwtSecret = config.jwtSecret;

interface VerifyJwtReturntypes {
    valid: boolean;
    expired: boolean;
    decodedJwt: Object | null;
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
            expired: false,
            decodedJwt: decoded,
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: true,
            decodedJwt: null,
        };
    }
}

export { signJwt, verifyJwt };
