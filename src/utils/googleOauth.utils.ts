import config from '../config/app.config';

function getGoogleOauthUrl() {
    const { googleOauthRedirectUrl, googleClientId } = config;
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ].join(' ');

    const options = {
        redirect_uri: googleOauthRedirectUrl,
        client_id: googleClientId,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: scopes,
    };
    const queryString = new URLSearchParams(options);
    const googleOauthUrl = `${rootUrl}?${queryString.toString()}`;

    return googleOauthUrl;
}

export default getGoogleOauthUrl;
