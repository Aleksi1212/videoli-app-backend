import axios from 'axios';
import RouteError from '../../utils/error.utils';

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

export default getGoogleUserData