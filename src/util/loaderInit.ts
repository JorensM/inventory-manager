import platforms from '@/classes/PlatformManager/AllPlatforms';
import SettingsManager from '@/classes/SettingsManager';

let initialized = false;

/**
 * Wrapper loader that does some initialization logic before calling the loader function
 * @param loaderFn loader function to call
 * @returns loaderFn that was passed
 */
export default async function loaderInit() {

    if(initialized) {
        return;
    }

    const settings = await SettingsManager.getSettings();

    platforms.get('reverb').setApiKey(settings.reverb_key);

    initialized = true;
};