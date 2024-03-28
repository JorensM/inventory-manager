// Core
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

// Classes
import platforms from '@/classes/PlatformManager/AllPlatforms';
import SettingsManager from '@/classes/SettingsManager';

// Constants
import routes from '@/constants/routes';

// Util
import { apiGET } from '@/util/api';

export default async function ebayAuthConfirmLoader( { request }: LoaderFunctionArgs) {

    const sessionId = localStorage.getItem('inv-mgr:ebay-session-id');

    if(!sessionId) {
        throw new Error('Cannot find session ID');
    }

    const { token } = await apiGET('auth/ebay/authnauth-token?session_id=' + sessionId);

    //const url = new URL(request.url);
    //const token = url.searchParams.get("token");
    //const refresh_token = url.searchParams.get("refresh_token");

    if(!token) throw new Error('Cannot find access token')
    //if(!refresh_token) throw new Error('Cannot find refresh token');

    //console.log('token: ', token)

    await SettingsManager.updateSettings({
        ebay_key: token,
    })

    await platforms.get('ebay').refreshAPIKey();

    //platforms.get('ebay').setApiKey(token);

    return redirect(routes.settings);
}