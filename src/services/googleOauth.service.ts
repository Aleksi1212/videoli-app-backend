import config from '../config/appConfig';
import axios from 'axios';
import qs from 'qs';
import RouteError from '../utils/error.utils';

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
    const googleOauthTokenUrl = 'https://oauth2.googleapis.com/token';
    const googleOauthTokenQueryValues: GoogleTokenValues = {
        code: googleOauthCode,
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        redirect_uri: config.googleOauthRedirectUrl,
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



type Tokens = {
    id_token: string;
    access_token: string;
};

interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

async function getGoogleUserData({
    id_token,
    access_token,
}: Tokens): Promise<GoogleUserResult> {
    const googleUserUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

    try {
        const googleUserRequest = await axios.get<GoogleUserResult>(
            googleUserUrl,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );
        const googleUserResponse = googleUserRequest.data;

        return googleUserResponse;
    } catch (error: any) {
        console.error(error.response.data.error);
        throw new RouteError(error.message);
    }
}

export { getGoogleOauthTokens, getGoogleUserData };
