// Types
import { PlatformID } from '@/types/Platform';

// Util
import storage from '@/util/storage';

// Constants
import storage_keys from '@/constants/storage_keys'
import { Settings } from '@/types/Settings';

export default function useSettings() {

    return {
        getAPIKey(platform_id: PlatformID) {
            return storage.get(storage_keys.settings)[platform_id + '_key']
        },
        setAPIKey(platform_id: PlatformID, api_key: string) {
            const settings = storage.get(storage_keys.settings);
            settings[platform_id + '_key'] = api_key;
            storage.set(storage_keys.settings, settings);
        },
        getSettings(): Settings {
            return storage.get(storage_keys.settings);
        }
    }
}