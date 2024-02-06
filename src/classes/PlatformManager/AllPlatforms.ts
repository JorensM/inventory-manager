// Types
import { PlatformID } from '@/types/Platform';

// Classes
import PlatformManager from './PlatformManager';
import ReverbManager from './ReverbManager';

// Constants
import storage_keys from '@/constants/storage_keys';

// Util
import storage from '@/util/storage';
import { Settings } from '@/types/Settings';
import { PlatformListing } from '@/types/Listing';

const settings = storage.get(storage_keys.settings) as Settings

class Platforms {

    platforms: Record<PlatformID, PlatformManager<PlatformListing>> = {
        reverb: new ReverbManager(settings.reverb_key, settings.reverb_mode == 'sandbox'),
        ebay: new ReverbManager(null, true)
    }

    get(platform_id: PlatformID) {
        return this.platforms[platform_id]
    }

    all() {
        return this.platforms;
    }
}

const platforms = new Platforms();

export default platforms;