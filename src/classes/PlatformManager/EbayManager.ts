import { EbayListing, Listing } from '@/types/Listing';
import PlatformManager from './PlatformManager';
import { apiGET } from '@/util/api';
import SettingsManager from '../SettingsManager';

const CLIENT_ID = "AllanHar-Inventor-PRD-bcd6d2723-74d77282"
const SCOPES = "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly";

export default class EbayManager extends PlatformManager<EbayListing> {

    constructor(api_key: string) {
        super(api_key);
    }
    
    async uploadListing(listing: Listing): Promise<string | number> {
        
    }

    async authorize(): Promise<void> {
        // this.GET('oauth2/authorize', {
        //     client_id: CLIENT_ID,
        //     redirect_uri: "Allan_Harrell-AllanHar-Invent-jxrrf",//import.meta.env.VITE_APP_URL!,
        //     scope: SCOPES,
        //     response_type: 'code'
        // }, "auth")

        const url = this.createAPIURL('oauth2/authorize', {
            client_id: CLIENT_ID,
            redirect_uri: "Allan_Harrell-AllanHar-Invent-jxrrf",
            scope: SCOPES,
            response_type: 'code'
        }, "auth")

        window.location.href = url.href;

        return;
    }

    async deauthorize(): Promise<void> {
        await SettingsManager.updateSettings({
            ebay_key: null
        })

        this.setApiKey(null);
    }

    async refreshAPIKey(): Promise<void> {

        const settings = await SettingsManager.getSettings();

        const refresh_token = settings.ebay_refresh_token;

        if(!refresh_token) throw new Error('Ebay refresh token not set in settings');

        const access_token = await apiGET('auth/ebay/refresh-token', {
            refresh_token
        }, 'text');

        await SettingsManager.updateSettings({
            ebay_key: access_token
        })

        this.setApiKey(access_token);
    }

    async ping(api_key: string): Promise<boolean> {

        // this.authorize();

        // const data = await this.GET("sell/account/v1/custom_policy", undefined, undefined, api_key);

        const data = await apiGET('api/ebay/ping', { token: this.api_key || api_key });

        if(!data.success) {
            await this.refreshAPIKey();

            const _data = await apiGET('api/ebay/ping', { token: this.api_key || api_key})

            return _data.success;
        }

        return data.success;
    }

    // private createInventoryItem(): Promise<boolean> {

    // }

    private createAPIURL(endpoint: string, params?: { [key: string]: string }, type?: 'auth') {
        const url = new URL("https://" + (type == 'auth' ? "auth" : "api") + ".ebay.com/" + endpoint);

        if(params) Object.entries(params).map(([key, value]) => url.searchParams.set(key, value));

        return url;
    }

    private async request(url: URL, method: 'GET', api_key?: string) {
        const res = await fetch(url, {
            method,
            redirect: 'follow'
        })

        const data = await res.json();

        return data;
    }   

    private async GET(endpoint: string, params?: { [key: string]: string }, type?: "auth", api_key?: string) {

        const url = this.createAPIURL(endpoint, params, type);
        

        const data = await this.request(url, 'GET', api_key);
        return data;
    }
}