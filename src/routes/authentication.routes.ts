import express from 'express';
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
        res.redirect('/googleAuth');
    });

export default authenticationRoutes;
