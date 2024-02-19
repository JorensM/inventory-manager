import { Listing, ListingUpdate, ReverbListing } from '@/types/Listing';
import PlatformManager from './PlatformManager';

export default class ReverbManager extends PlatformManager<ReverbListing> {

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

    //-- Extended Methods --//

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

    async uploadListing(listing: Listing): Promise<number> {

        const data_to_send = this.listingToRequestData(listing);

        const data = await this.POST('listings', data_to_send);

        return data.listing.id;
    }
    
    async updateListing(listing: ListingUpdate): Promise<void> {
        const data_to_send = this.listingToRequestData(listing);

        const data = await this.PUT('listings/' + listing.reverb_id, data_to_send);

        return data;

    }

    async getListing(listing: Listing): Promise<ReverbListing | null> {
        const data = await this.GET('listings/' + listing.reverb_id);
        if(!data) {
            return null;
        }

        const converted_data = this.responseDataToListing(data);

        return converted_data;
    }

    async deleteListing(listing: Listing): Promise<void> {
        const data = await this.DELETE('listings/' + listing.reverb_id);

        // console.log(data);
        
        // if(data.error) {
        //     throw new Error('Could not delete listing: ' + JSON.stringify(data.error))
        // }
    }

    async isSynced(listing: Listing, reverb_listing: ReverbListing): Promise<boolean> {
        
        // const reverb_listing = await this.getListing(listing);

        return (
            listing.brand == reverb_listing.make &&
            listing.model == reverb_listing.model &&
            listing.title == reverb_listing.title &&
            listing.reverb_status == reverb_listing.status
        )

    }
    
    //-- Added Methods --//

    /**
     * Set whether to make calls to Sandbox Reverb or Live reverb
     * @param is_sandbox whether to make sandbox API calls
     */
    setIsSandbox(is_sandbox: boolean) {
        this.is_sandbox = is_sandbox;
    }

    getRequiredFields() {
        return ['s']
    }

    /**
     * Create an API url based on endpint.
     * @param endpoint portion of the API url after `.../api/`, for example `listings`
     * @returns returns full URL
     */
    private createAPIURL(endpoint: string) {
        return new URL(`https://${this.is_sandbox ? 'sandbox' : 'api'}.reverb.com/api/` + endpoint);
    }

    /**
     * Make request to Reverb's API
     * @param url Full URL to the endpoint
     * @param type request type, can be 'get', 'post', 'put, 'delete'
     * @param api_key API key to use in the request
     * @param data Optional data to add to the body of the request
     * 
     * @returns API request's response as an object
     */
    private async request(url: URL, type: 'get' | 'post' | 'put' | 'delete', api_key: string, data?: object){
        if(!api_key || api_key == '') {
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
            } else if(res.status == 404) {
                return null;
            } else {
                const data = await res.json()
                throw new Error(data.message);
            }
            
        }

        const res_data = await res.json();

        return res_data;
    }

    /**
     * Make GET request to API
     * @param endpoint Endpoint to call
     * @param api_key (Optional) API key to overwrite the currently set API Key
     * 
     * @returns API request response as object
     */
    async GET(endpoint: string, api_key = this.api_key) {

        const url = this.createAPIURL(endpoint);

        const data = await this.request(url, 'get', api_key!);

        return data;
    }

    /**
     * Make PUT request to a Reverb endpoint
     * @param endpoint Endpoint to send request to. Shouldn't start with slash and hostname, only the path
     * @param api_key (Optional) API key to use to overwrite the set api_key
     * 
     * @return Request response as an object
     */
    private async PUT(endpoint: string, data: object, api_key = this.api_key) {

        const url = this.createAPIURL(endpoint);

        const res_data = await this.request(url, 'put', api_key!, data);

        return res_data;

    }

    /**
     * Make POST request to API
     * @param endpoint Endpoint to call
     * @param data Data to send as object
     * @param api_key (Optional) API key to overwrite the currently set API Key
     * 
     * @returns API request response as object
     */
    async POST(endpoint: string, data: object, api_key = this.api_key) {

        const url = this.createAPIURL(endpoint);

        const res_data = await this.request(url, 'post', api_key!, data);

        return res_data;
    }

    /**
     * Make DELETE request to API
     * @param endpoint Endpoint to call
     * @param api_key (Optional) API key to overwrite the currently set API Key
     * 
     * @returns API request response as object
     */
    async DELETE(endpoint: string, api_key = this.api_key) {

        const url = this.createAPIURL(endpoint);

        const res_data = await this.request(url, 'delete', api_key!);

        return res_data;
    }

    /**
     * Convert a Listing object to Reverb's listing schema suitable for making API calls
     * @param listing Listing object to convert
     * 
     * @returns listing object matching Reverb API's listing schema
     */
    private listingToRequestData(listing: Listing | ListingUpdate) {
        // console.log(listing.reverb_status == 'published' ? 'true' : 'false')
        return {
            title: listing.title,
            make: listing.brand,
            model: listing.model,
            publish: listing.reverb_status == 'published' ? 'true' : 'false',
            categories: [{
                uuid: listing.category?.reverb
            }]
        }
    }

    /**
     * Convert API response listing data to a ReverbListing object
     * @param data Full data from response
     * @returns ReverbListing object
     */
    private responseDataToListing(data: any): ReverbListing {
        // console.log(data);
        return {
            id: data.id,
            title: data.title,
            make: data.make,
            model: data.model,
            link: data._links.web.href,
            status: data.draft ? 'draft' : 'published',
        }
    }

    
}