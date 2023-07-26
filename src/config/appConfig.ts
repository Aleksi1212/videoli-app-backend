import dotenv from 'dotenv';
dotenv.config();

const config = {
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    accessTokenTtl: '20m',
    refreshTokenTtl: '1y',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleOauthRedirectUrl: `${process.env.HOST}/oauth/session/google`,
};

export default config;
