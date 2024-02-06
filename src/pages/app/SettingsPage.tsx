// Core
import { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';

// Components
import SessionPage from '@/components/layout/SessionPage';
import APIKeyField from '@/components/input/APIKeyField';
import BackButton from '@/components/buttons/BackButton';
import SelectInput from '@/components/input/SelectInput';

// Types
import { PlatformID } from '@/types/Platform';
import { Status } from '@/types/Status';
import { APIKeyName } from '@/types/Listing';
import { Settings } from '@/types/Settings';

// Util
import debounce from '@/util/debounce';
import storage from '@/util/storage';

// Constants
import { platform_name } from '@/constants/localization';
import storage_keys from '@/constants/storage_keys';

// Hooks
import usePlatforms from '@/hooks/usePlatforms';
import useSettings from '@/hooks/useSettings';

// Classes
import ReverbManager from '@/classes/PlatformManager/ReverbManager';
import SettingsManager from '@/classes/SettingsManager';
import platforms from '@/classes/PlatformManager/AllPlatforms';


type PlatformStatuses = Record<PlatformID, Status | null>

/**
 * These platform won't display on the settings page
 */
const disabled_platforms = [ 'ebay' ];



type APIKeyField = {
    platform_id: PlatformID,
    initial_value: string,
    label: string
}

type APIKeysFormValues = Record<APIKeyName, string>

type ModesFormValues = {
    reverb_mode: 'sandbox' | 'live'
}

/**
 * The settings page
 */
export default function SettingsPage() {

    //-- Hooks --//
    // const platforms = usePlatforms();
    const { revalidate } = useRevalidator();
    const { settings } = useLoaderData() as { settings: Settings };
    // const settings = useSettings();

    //-- State --//
    const initialStatues: PlatformStatuses = useMemo(() => {
        const _settings = settings;
        return {
            reverb: _settings.reverb_key ? 'loading' : null,
            ebay: _settings.ebay_key ? 'loading' : null
        }
    }, [])
    /**
     * Statuses for the platforms
     */
    const [ platformStatuses, setPlatformStatuses ] = useState<PlatformStatuses>(initialStatues)
    /**
     * Whether the API keys form is dirty (fields have been edited)
     */
    const [ APIKeysFormDirty, setAPIKeysFormDirty ] = useState<boolean>(false);

    //-- Memo --//

    /**
     * Field data for API key fields
     */
    const api_key_fields: APIKeyField[] = useMemo(() => {
        return Object.keys(platforms.platforms).filter(platform_id => !disabled_platforms.includes(platform_id)).map((platform_id) => ({
            platform_id: platform_id as PlatformID,
            initial_value: settings[platform_id + '_key' as keyof Settings],//.getAPIKey(platform_id as PlatformID) || "",
            label: platform_name[platform_id as PlatformID]
        }))
    }, [])

    /**
     * Whether the API key form submit should be disabled. If any API key field
     * that is non-empty has a non-success status, the state will be disabled
     */
    const APIKeysSubmitDisabled = useMemo(() => {
        return Object.values(platformStatuses).some(platformStatus => platformStatus != 'success' && platformStatus != null) || !APIKeysFormDirty;
    }, [platformStatuses, APIKeysFormDirty])

    //-- Functions --//

    /**
     * Set state for a single platform in platformStatuses state
     * @param platform_id ID of platform
     * @param status new status
     */
    const setPlatformStatus = (platform_id: PlatformID, status: Status | null) => {
        setPlatformStatuses((old_state) => {
            const new_state = {...old_state};
            new_state[platform_id] = status;

            return new_state;
        })
    }

    /**
     * Pings specified platform.
     * @param platform_id ID of platform to ping
     * @param api_key API key to ping with
     * 
     * @returns Promise resolving to true if ping was successful, false if not
     */
    const pingPlatform = async (platform_id: PlatformID, api_key: string) => {
        const success = await platforms.platforms[platform_id].ping(api_key);

        setPlatformStatus(platform_id, success ? 'success' : 'fail')
    }

    /**
     * Debounced ping functions for all platforms as object. access respective
     * platform ping function by key PlatformID
     */
    const debouncedPing: Record<PlatformID, any> = useMemo(() => ({
        reverb: debounce((api_key: string) => {pingPlatform('reverb', api_key)}, 1000),
        ebay: () => {}
    }), [])

    /**
     * Get API Key field from api_key_fields
     * @param platform_id ID of platform
     * 
     * @return APIKeyField for respective platform
     */
    const getAPIKeyField = (platform_id: PlatformID) => {
        return api_key_fields.find(field => field.platform_id == platform_id)!;
    }

    //-- Handlers --//
    
    /**
     * On API Field change
     * 
     * @param platform_id ID of the platform for which the key was changed
     * @param value new value (API key) of the input
     */
    const handleAPIKeyChange = (platform_id: PlatformID, api_key: string) => {
        if(api_key == '') {
            setPlatformStatus(platform_id, null);
            debouncedPing[platform_id].cancel();
            return;
        } else {
            setPlatformStatus(platform_id, 'loading');
        }
        console.log('debouncing')
        debouncedPing[platform_id](api_key);
    }

    /**
     * On API keys form submit. Saves API keys to storage
     * 
     * @param values form values
     */
    const handleAPIKeysSubmit = async (values: APIKeysFormValues, formikHelpers: FormikHelpers<APIKeysFormValues>) => {
        const new_settings = { ...settings }

        for(const key in values) {
            new_settings[key as APIKeyName] = values[key as APIKeyName]
            const platform_id = key.slice(0, -4); // Get Platform ID from APIKeyName
            platforms.platforms[platform_id as PlatformID].setApiKey(values[key as APIKeyName]);
        }

        await SettingsManager.updateSettings(new_settings)

        // storage.set(storage_keys.settings, settings);

        formikHelpers.resetForm({ values });
        revalidate();
    }

    /**
     * Handle modes form submit. Updates new values in settings
     * 
     * @param values Formik values
     * @param formikHelpers Formik helpers
     */
    const handleModesSubmit = async (values: ModesFormValues, formikHelpers: FormikHelpers<ModesFormValues>) => {
        await SettingsManager.updateSettings(values);

        (platforms.platforms.reverb as ReverbManager).setIsSandbox(values.reverb_mode == 'sandbox');

        formikHelpers.resetForm({ values });

        revalidate();
    }

    //-- Effects --//
    
    /**
     * Initially ping platforms where API key is set
     */
    useEffect(() => {
        Object.entries(platformStatuses).map(([platform_id, status]) => {
            if(status) {
                pingPlatform(platform_id as PlatformID, settings[platform_id + '_key' as keyof Settings]);
            }
        })
    }, [])

    return (
        <SessionPage>
            <section>
                <BackButton />
                <h1>Settings</h1>
            </section>
            <section>
                {/* API Keys form */}
                <h2>API Keys</h2>
                <Formik<APIKeysFormValues>
                    initialValues={{
                        reverb_key: getAPIKeyField('reverb').initial_value, // This should be fetched from a loader
                        ebay_key: ''
                    }}
                    onSubmit={handleAPIKeysSubmit}
                >
                    {formik => {
                        const APIKeysSubmitDisabled = Object.values(platformStatuses)
                            .some(platformStatus => platformStatus != 'success' && platformStatus != null) || !formik.dirty;
                        return (
                            <Form>
                                {api_key_fields.map(field => (
                                    <>
                                        <APIKeyField
                                            key={field.platform_id}
                                            status={platformStatuses[field.platform_id]}
                                            label={field.label}
                                            name={field.platform_id + '_key'}
                                            onChange={(e) => handleAPIKeyChange(field.platform_id, e.currentTarget.value)}
                                        />
                                    </>
                                    
                                ))}
                                <button type='submit' disabled={APIKeysSubmitDisabled}>Save API Keys</button>
                            </Form>
                        )
                    }}                    
                </Formik>
                <h2>Modes</h2>
                {  }
                <Formik<ModesFormValues>
                    initialValues={{
                        reverb_mode: settings.reverb_mode
                    }}
                    onSubmit={handleModesSubmit}
                >
                    {formik => {
                        return (
                            <Form>
                                <SelectInput
                                    label='Reverb mode'
                                    name='reverb_mode'
                                    options={[
                                        {
                                            label: 'Sandbox',
                                            value: 'sandbox'
                                        },
                                        {
                                            label: 'Live',
                                            value: 'live'
                                        }
                                    ]}
                                />
                                <button type='submit' disabled={!formik.dirty}>Save Modes</button>
                            </Form>
                        )
                    }}                    
                </Formik>
            </section>
        </SessionPage>
    )
}