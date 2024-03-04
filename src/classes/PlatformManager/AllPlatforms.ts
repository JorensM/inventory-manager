// Types
import { PlatformID } from '@/types/Platform';

// Classes
import PlatformManager from './PlatformManager';
import ReverbManager from './ReverbManager';
import EbayManager from './EbayManager';

// Util
import { PlatformListing } from '@/types/Listing';

class Platforms {

    /**
     * All platforms
     */
    platforms: Record<PlatformID, PlatformManager<PlatformListing>> = {
        reverb: new ReverbManager(null, true),
        ebay: new EbayManager('123')
    }

    /**
     * Get a specific platform
     * @param {PlatformID} platform_id ID of platform
     * @returns { PlatformManager }
     */
    get(platform_id: PlatformID) {
        return this.platforms[platform_id]
    }

    /**
     * Get all platforms
     * @returns Object of all platforms where key is the platform ID and property
     * is the corresponding PlatformManager
     */
    all() {
        return this.platforms;
    }
}

// Instantiate AllPlatforms and export it
const platforms = new Platforms();
export default platforms;