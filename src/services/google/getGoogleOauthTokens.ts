import config from '../../config/app.config';
import axios from 'axios';
import qs from 'qs';
import RouteError from '../../utils/error.utils';

interface GoogleTokensResults {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

type GoogleTokenKey =
    | 'code'
    | 'client_id'
    | 'client_secret'
    | 'redirect_uri'
    | 'grant_type';

type GoogleTokenValues = Record<GoogleTokenKey, string>;

async function getGoogleOauthTokens(
    googleOauthCode: string
): Promise<GoogleTokensResults> {
    const { googleClientId, googleClientSecret, googleOauthRedirectUrl } =
        config;

    const googleOauthTokenUrl = 'https://oauth2.googleapis.com/token';
    const googleOauthTokenQueryValues: GoogleTokenValues = {
        code: googleOauthCode,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: googleOauthRedirectUrl,
        grant_type: 'authorization_code',
    };

    try {
        const googleOauthTokensRequest = await axios.post<GoogleTokensResults>(
            googleOauthTokenUrl,
            qs.stringify(googleOauthTokenQueryValues),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        const googleOauthTokensResponse = googleOauthTokensRequest.data;

        return googleOauthTokensResponse;
    } catch (error: any) {
        console.error(error.response.data.error);
        throw new RouteError(error.message);
    }
}

export default getGoogleOauthTokens;
