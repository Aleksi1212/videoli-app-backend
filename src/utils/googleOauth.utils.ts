import config from '../config/appConfig';

function getGoogleOauthUrl() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ].join(' ');

    const options = {
        redirect_uri: config.googleOauthRedirectUrl,
        client_id: config.googleClientId,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: scopes,
    };
    const queryString = new URLSearchParams(options);

    return `${rootUrl}?${queryString.toString()}`;
}

export default getGoogleOauthUrl;
