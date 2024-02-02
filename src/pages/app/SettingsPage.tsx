// Core
import { useMemo, useState } from 'react';
import { Form, Formik } from 'formik';

// Components
import SessionPage from '@/components/layout/SessionPage';
import APIKeyField from '@/components/input/APIKeyField';

// Types
import { PlatformID } from '@/types/Platform';
import { Status } from '@/types/Status';

// Util
import debounce from '@/util/debounce';

// Constants
import { platform_name } from '@/constants/localization';

// Hooks
import usePlatforms from '@/hooks/usePlatforms';
import useSettings from '@/hooks/useSettings';


type PlatformStatuses = Record<PlatformID, Status | null>

const disabled_platforms = [ 'ebay' ];

/**
 * The settings page
 */
export default function SettingsPage() {
    
    // State
    const [ platformStatuses, setPlatformStatuses ] = useState<PlatformStatuses>({
        reverb: null,
        ebay: null
    })

    // Hooks
    const platforms = usePlatforms();
    const settings = useSettings();

    // Memo
    const api_key_fields: {
        platform_id: PlatformID,
        initial_value: string,
        label: string
    }[] = useMemo(() => {
        return Object.keys(platforms.platforms).filter(platform_id => !disabled_platforms.includes(platform_id)).map((platform_id) => ({
            platform_id: platform_id as PlatformID,
            initial_value: settings.getAPIKey(platform_id as PlatformID) || "",
            label: platform_name[platform_id as PlatformID]
        }))
    }, [])

    // Functions

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

    const debouncedPing: Record<PlatformID, any> = useMemo(() => ({
        reverb: debounce((api_key: string) => {pingPlatform('reverb', api_key)}, 1000),
        ebay: () => {}
    }), [])

    // const debouncedReverbPing = debounce((api_key: string) => {pingPlatform('reverb', api_key)}, 1000);

    // Handlers
    
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
        } else if (platformStatuses[platform_id] == null) {
            setPlatformStatus(platform_id, 'loading');
        }
        console.log('debouncing')
        debouncedPing[platform_id](api_key);
    }

    /**
     * On form submit.
     */
    const handleSubmit = () => {

    }

    return (
        <SessionPage>
            <section>
                <h1>Settings</h1>
                <Formik
                    initialValues={{
                        reverb_key: ""
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        {api_key_fields.map(field => (
                            <APIKeyField
                                status={platformStatuses[field.platform_id]}
                                label={field.label}
                                name={field.platform_id + '_key'}
                                onChange={(e) => handleAPIKeyChange(field.platform_id, e.currentTarget.value)}
                            />
                        ))}
                        {/* <APIKeyField */}
                            {/* status={platformStatuses.reverb} */}
                            {/* label='Reverb API key' */}
                            {/* name='reverb_key' */}
                            {/* onChange={(e) => handleAPIKeyChange('reverb', e.currentTarget.value)} */}
                        {/* /> */}
                    </Form>
                </Formik>
            </section>
        </SessionPage>
    )
}