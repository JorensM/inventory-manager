import { Listing } from '@/types/Listing';
import PlatformManager from './PlatformManager';

export default class ReverbManager extends PlatformManager {

    /**
     * Reverb integration
     */

    /**
     * Whether requests should be made to Sandbox Reverb or live Reverb
     */
    is_sandbox: boolean;

    constructor(api_key: string | null, is_sandbox: boolean) {
        super(api_key);

        this.is_sandbox = is_sandbox;
    }

    private createAPIURL(endpoint: string) {
        return new URL(`https://${this.is_sandbox ? 'sandbox' : 'api'}.reverb.com/api/` + endpoint);
    }

    private async request(url: URL, type: 'get' | 'post', api_key: string, data?: object){
        if(!api_key) {
            throw new Error('Cannot make Reverb request because API key is not set');
        }

        const res = await fetch(url, {
            method: type,
            headers: {
                "Content-Type": "application/hal+json",
                "Accept": "application/hal+json",
                "Accept-Version": "3.0",
                "Authorization": `Bearer ${api_key}`
            },
            body: data ? JSON.stringify(data) : undefined
        });
        if(!res.ok) {
            if(res.status == 401) {
                throw new Error('Reverb: Unauthorized')
            }
            return null;
        }

        const res_data = await res.json();

        return res_data;
    }

    async GET(endpoint: string, api_key = this.api_key) {

        const url = this.createAPIURL(endpoint);

        const data = await this.request(url, 'get', api_key!);

        return data;
    }

    async POST(endpoint: string, data: object, api_key = this.api_key) {

        const url = this.createAPIURL(endpoint);

        const res_data = await this.request(url, 'post', api_key!, data);

        return res_data;
    }

    async ping(api_key: string) {
        try {
            const data = await this.GET('my/account', api_key);

            if(data) {
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    private listingToRequestData(listing: Listing) {
        return {
            title: listing.title,
            make: listing.make,
            model: listing.model
        }
    }

    async uploadListing(listing: Listing): Promise<number> {

        const data_to_send = this.listingToRequestData(listing);

        const data = await this.POST('listings', data_to_send);

        console.log(data);

        return data.listing.id;
    }
}