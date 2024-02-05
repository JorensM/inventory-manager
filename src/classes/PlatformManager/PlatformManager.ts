import { Listing } from '@/types/Listing';

export default abstract class PlatformManager {

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
    
    setApiKey(api_key: string | null) {
        this.api_key = api_key
    }
    
}