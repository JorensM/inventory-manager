import { Listing, ListingUpdate } from '@/types/Listing';

export default abstract class PlatformManager<ListingT> {

    /**
     * Platform manager base class. 
     */

    api_key: string | null

    constructor(api_key: string | null) {
        this.api_key = api_key;
    }
    
    /**
     * Ping platform using specified api key
     * @param api_key api key to use for the ping
     * 
     * @returns Promise that resolves to true if ping was successful, or false if not
     */
    abstract ping(api_key: string): Promise<boolean>;

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
    abstract updateListing(listing: ListingUpdate): Promise<void>;

    /**
     * Get listing from platform
     * @param listing Listing object for which to get the respective platform listing
     * 
     * @return Promise resolving to a Listing object
     */
    abstract getListing(listing: Listing): Promise<ListingT>;
    
    /**
     * Delete listing from platform
     * @param listing Listing to delete
     */
    abstract deleteListing(listing: Listing): Promise<void>;

    /**
     * Check whether provided listing is synced with its respective platform listing
     * @param listing listing to check
     * 
     * @return true if synced, false if not
     */
    abstract isSynced(listing: Listing): Promise<boolean>;

    setApiKey(api_key: string | null) {
        this.api_key = api_key
    }
    
}