import platforms from '@/classes/PlatformManager/AllPlatforms';
import SettingsManager from '@/classes/SettingsManager';
import routes from '@/constants/routes';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';

export default async function ebayAuthConfirmLoader( { request }: LoaderFunctionArgs) {

    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const refresh_token = url.searchParams.get("refresh_token");

    if(!token) throw new Error('Cannot find access token')
    if(!refresh_token) throw new Error('Cannot find refresh token');

    //console.log('token: ', token)

    await SettingsManager.updateSettings({
        ebay_key: token,
        ebay_refresh_token: refresh_token
    })

    await platforms.get('ebay').refreshAPIKey();

    //platforms.get('ebay').setApiKey(token);

    return redirect(routes.settings);
}