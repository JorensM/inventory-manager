// Constnats
import storage_keys from '@/constants/storage_keys';

// Types
import { PlatformID } from '@/types/Platform';
import { Settings } from '@/types/Settings';

// Util
import storage from '@/util/storage';

export default class SettingsManager {
    static getAPIKey(platform_id: PlatformID) {
        return storage.get(storage_keys.settings)[platform_id + '_key']
    }
    static setAPIKey(platform_id: PlatformID, api_key: string) {
        const settings = storage.get(storage_keys.settings);
        settings[platform_id + '_key'] = api_key;
        storage.set(storage_keys.settings, settings);
    }
    /**
        * Update settings.
        * @param updated_settings Settings to update. Settings that are not specified
        * will be left unchanged
    */
    static async updateSettings(updated_settings: Partial<Settings>) {
        const new_settings = { 
            ...storage.get(storage_keys.settings),
            ...updated_settings
        };

        storage.set(storage_keys.settings, new_settings);
    }
}