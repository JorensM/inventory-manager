import { Listing, ListingUpdate } from '@/types/Listing';

export default abstract class PlatformManager<ListingT> {

    /**
     * Platform manager base class. 
     */

    api_key: string | null = null

    api_key_valid: boolean = false;

    is_enabled: boolean = false

    constructor(api_key: string | null) {
        // this.setApiKey(api_key);
    }
    
    /**
     * Ping platform using specified api key
     * @param api_key api key to use for the ping
     * 
     * @returns Promise that resolves to true if ping was successful, or false if not
     */
    abstract ping(api_key: string): Promise<boolean>;

    /**
     * Whether the manager is enabled. Will return false if API key is invalid
     * @returns boolean indicating whether the manager is enabled. If manager is
     * disabled, CRUD methods like uploadListing() etc. will throw an error
     */
    isEnabled(): boolean {
        return this.api_key_valid && this.is_enabled;
    }

    /**
     * Upload listing to platform
     * 
     * @param listing Listing to upload.
     * 
     * @returns Promise resolving to the created listing's ID
     */
    abstract uploadListing(listing: Listing): Promise<string | number>;

    /**
     * Update listing on platform
     * @param listing Listing data to update. Unspecified properties will be left
     * unchanged
     */
    abstract updateListing(listing: ListingUpdate, send_images?: boolean): Promise<void>;

    /**
     * Get listing from platform
     * @param listing Listing object for which to get the respective platform listing
     * 
     * @return Promise resolving to a Listing object or null if listing not found
     */
    abstract getListing(listing: Listing): Promise<ListingT | null>;
    
    /**
     * Delete listing from platform
     * @param listing Listing to delete
     */
    abstract deleteListing(listing: Listing): Promise<void>;

    /**
     * Check whether provided listing is synced with its respective platform listing
     * @param listing listing to check
     * @param platform_listing listing from the platform to check against
     * 
     * @return true if synced, false if not
     */
    abstract isSynced(listing: Listing, platform_listing: ListingT): Promise<boolean>;

    async setApiKey(api_key: string | null) {
        this.api_key = api_key;

        const pinged = await this.ping(api_key || "");

        this.api_key_valid = api_key ? pinged : false;
    }

    /**
     * Enables/disables manager. If manager is disabled, most methods won't work and will throw an error
     * Note that if the API key is invalid then the manager will be disabled regardless
     * of what you set the enabled property to.
     * @param is_enabled Whether manager should be enabled or not
     */
    setEnabled(is_enabled: boolean) {
        this.is_enabled = is_enabled
    } 
    
}