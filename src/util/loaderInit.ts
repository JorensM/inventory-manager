import platforms from '@/classes/PlatformManager/AllPlatforms';
import ReverbManager from '@/classes/PlatformManager/ReverbManager';
import SettingsManager from '@/classes/SettingsManager';

let initialized = false;

/**
 * Wrapper loader that does some initialization logic before calling the loader function
 * @param loaderFn loader function to call
 * @returns loaderFn that was passed
 */
export default async function loaderInit() {

    // If already initialized, skip this function because we need the initialization
    // logic to only run once
    if(initialized) {
        return;
    }

    const settings = await SettingsManager.getSettings();


    // Initialize platforms, set their modes and API keys and enabled them
    (platforms.get('reverb') as ReverbManager).setIsSandbox(settings.reverb_mode == 'sandbox')
    await platforms.get('reverb').setApiKey(settings.reverb_key);
    platforms.get('reverb').setEnabled(true);

    // Set initialized to true so this function can run only once
    initialized = true;
};