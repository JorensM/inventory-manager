// Constnats
import { DEFAULT_SETTINGS } from '@/constants/defaults';
import storage_keys from '@/constants/storage_keys';

// Types
import { PlatformID } from '@/types/Platform';
import { Settings } from '@/types/Settings';

// Util
import storage from '@/util/storage';
import supabase from '@/util/supabase';

export default class SettingsManager {
    static async getAPIKey(platform_id: PlatformID) {
        const settings = await this.getSettings();
        return settings[platform_id + '_key' as keyof Settings]
    }
    static async setAPIKey(platform_id: PlatformID, api_key: string) {
        this.updateSettings({
            [platform_id + '_key']: api_key
        })
    }

    /**
     * Retrieve settings from 
     * @returns 
     */
    static async getSettings(): Promise<Settings> {
        const { data: { user } , error } = await supabase.auth.getUser();

        if (error) throw error;

        if(!user) {
            throw new Error('Cannot get settings because user is not logged in');
        }

        const user_settings = user.user_metadata.settings;

        if(!user_settings) {
            await this.updateSettings(DEFAULT_SETTINGS);
            return DEFAULT_SETTINGS;
        }

        return user_settings;
    }
    /**
        * Update settings.
        * @param updated_settings Settings to update. Settings that are not specified
        * will be left unchanged
    */
    static async updateSettings(updated_settings: Partial<Settings>) {
        const old_settings = await this.getSettings();
        const new_settings = { 
            ...old_settings,
            ...updated_settings
        };

        //storage.set(storage_keys.settings, new_settings);

        supabase.auth.updateUser({ 
            data: {
                settings: new_settings
            }
        })
    }
}