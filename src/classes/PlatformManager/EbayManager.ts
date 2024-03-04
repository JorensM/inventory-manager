// Types
import { EbayListing, Listing } from '@/types/Listing';
import { Params } from '@/types/Misc';

// Classes
import PlatformManager from './PlatformManager';
import SettingsManager from '../SettingsManager';

// Util
import { apiGET, apiPUT } from '@/util/api';

// Constants
import { API_URL } from '@/constants/env';

//These should probably be set as env variables or put into the constants folder
const CLIENT_ID = "AllanHar-Inventor-PRD-bcd6d2723-74d77282"
const SCOPES = "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly";

export default class EbayManager extends PlatformManager<EbayListing> {

    /**
     * @class EbayManager
     * 
     * Notes:
     * 
     * Request methods like GET, POST etc. have a type arg. This determines whether
     * to prefix the eBay endpoint URL with `auth.ebay...` or `api.ebay...`
     */

    constructor(api_key: string) {
        super(api_key);
    }
    
    async uploadListing(listing: Listing): Promise<string | number> {

        if(!listing.sku || listing.sku == "") {
            throw new Error('SKU missing');
        }

        const ebayListing = this.listingToEbayListing(listing);

        const url = this.createOwnAPIURL('upload');

        const data = await apiPUT(url, ebayListing);//this.PUT('sell/inventory/v1/inventory_item/' + listing.sku, ebayListing.inventory_item);

        console.log(data);

        if(data.error) {
            throw new Error(data.error)
        }
        console.log('success')
        return listing.sku
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

    /**
     * Create API url for accessing ebay endpoint on our own API
     * @param endpoint endpoint name without leading slash
     * @param [params] GET params
     * @returns URL object
     */
    private createOwnAPIURL(endpoint: string, params?: Params) {
        if(!this.api_key) {
            throw new Error('Cannot create URL because API key is not set')
        }
        
        const url = new URL(API_URL + 'api/ebay/' + endpoint);

        if(params) Object.entries(params).map(([key, value]) => url.searchParams.set(key, value));

        url.searchParams.set('token', this.api_key);

        return url;
    }

    /**
     * Create API url for accessing eBay endpoints
     * @param endpoint endpoint without leading slash
     * @param params GET parameters to add to URL
     * @param type Which type of request it is. Depending on value, URL will be `api.ebay...` or `auth.ebay...`
     * @returns URL object
     */
    private createAPIURL(endpoint: string, params?: { [key: string]: string }, type?: 'auth') {

        const url = new URL("https://" + (type == 'auth' ? "auth" : "api") + ".ebay.com/" + endpoint);

        if(params) Object.entries(params).map(([key, value]) => url.searchParams.set(key, value));
        
        return url;
    }

    /**
     * Abstract HTTP request method
     * @param url Target URL
     * @param method request method
     * @param body request body
     * @param api_key user's eBay access token
     * @returns request's response in form of JSON object
     */
    private async request(url: URL, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: Params, api_key?: string) {

        if(!api_key) {
            throw new Error('API key not provided');
        }

        const res = await fetch(url, {
            method,
            redirect: 'follow',
            headers: {
                'Content-Language': 'en-US',
                'Authorization': 'Bearer ' + api_key
            },
            body: JSON.stringify(body)
        })

        const data = await res.json();

        return data;
    }   

    /**
     * eBay API's GET method
     * @param endpoint endpoint name without leading slash
     * @param params GET params
     * @param type Request type. See notes at the top
     * @param api_key user's eBay access token
     * @returns 
     */
    private async GET(endpoint: string, params?: { [key: string]: string }, type?: "auth", api_key?: string) {

        const url = this.createAPIURL(endpoint, params, type);
        

        const data = await this.request(url, 'GET', undefined, api_key);
        return data;
    }

    /**
     * eBay API's GET method
     * @param endpoint endpoint name without leading slash
     * @param params GET params
     * @returns 
     */
    private async PUT(endpoint: string, params: Params) {
        const url = this.createAPIURL(endpoint);

        const data = await this.request(url, 'PUT', params, this.api_key || undefined);

        return data;
    }

    /**
     * Convert Listing object to an eBay listing format that is accepted by eBay's API
     */
    private listingToEbayListing(listing:Listing) {
        return ({
            sku: listing.sku,
            inventory_item: {
                product: {
                    title: listing.title
                }
            },
            offer: {
                format: 'FIXED_PRICE',
                marketplaceId: 'EBAY_US',
                sku: listing.sku
            }
        })
    }
}