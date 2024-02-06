import SettingsManager from '@/classes/SettingsManager';
import storage_keys from '@/constants/storage_keys';
import storage from '@/util/storage';

export default async function settingsPageLoader() {
    const settings = await SettingsManager.getSettings();

    return {
        settings
    }
}