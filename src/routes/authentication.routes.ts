import express from 'express';
import getGoogleOauthUrl from '../utils/oauth.utils';

const authenticationRoutes = express.Router();

authenticationRoutes
    .get('/getAccessToken', (req, res) => {
        res.json({ accessToken: 'token' });
    })

    .post('/requestOneTimePassword', (req, res) => {
        res.json({ otpSent: 'true | false' });
    })

    .post('/verifyOneTimePassword', (req, res) => {
        res.json({ valid: 'true | false' });
    })

    .get('/googleAuthentication', (req, res) => {
        res.status(301).redirect(getGoogleOauthUrl());
    })

    .get('/oauth/session/google', (req, res) => {
        res.json({ session: 'yay' });
    });

export default authenticationRoutes;
