// Types
import { PlatformID } from '@/types/Platform';

// Util
import storage from '@/util/storage';

// Constants
import storage_keys from '@/constants/storage_keys';

// Types
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
        },
        /**
         * Update settings.
         * @param updated_settings Settings to update. Settings that are not specified
         * will be left unchanged
         */
        async updateSettings(updated_settings: Partial<Settings>) {
            const new_settings = { 
                ...storage.get(storage_keys.settings),
                ...updated_settings
            };

            storage.set(storage_keys.settings, new_settings);
        }
    }
}