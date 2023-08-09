import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

interface SessionConfig {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    cookie: {
        secure: boolean;
        httpOnly: boolean;
    };
}

declare module 'express-session' {
    interface SessionData {
        email?: string;
        name?: string;
        userId?: string;
    }
}

const sessionConfig: SessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
    },
};
const newSession = session(sessionConfig);

type SameSite = 'lax' | 'strict' | 'none'
interface CookieOptions {
    maxAge: number;
    httpOnly: boolean;
    sameSite: SameSite;
    secure: boolean;
}

const refreshTokenCookieOptions: CookieOptions = {
    maxAge: 3.154e10,
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
};

export { newSession, refreshTokenCookieOptions };
