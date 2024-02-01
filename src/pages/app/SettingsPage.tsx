// Core
import { useState } from 'react';
import { Form, Formik } from 'formik';

// Components
import SessionPage from '@/components/layout/SessionPage';
import APIKeyField from '@/components/input/APIKeyField';

// Types
import { PlatformID } from '@/types/Platform';
import { Status } from '@/types/Status';

// Util
import debounce from '@/util/debounce';

// Hooks
import usePlatforms from '@/hooks/usePlatforms';


type PlatformStatuses = Record<PlatformID, Status>

// Reverb token: 014b298091d99bafebe8658625b33183d03e943605a8207264dca52fa6c09fd2

/**
 * The settings page
 */
export default function SettingsPage() {
    
    // State
    const [ platformStatuses, setPlatformStatuses ] = useState<PlatformStatuses>({
        reverb: 'loading',
        ebay: 'loading'
    })

    // Hooks
    const platforms = usePlatforms();

    // Functions

    /**
     * Set state for a single platform in platformStatuses state
     * @param platform_id ID of platform
     * @param status new status
     */
    const setPlatformStatus = (platform_id: PlatformID, status: Status) => {
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

    const debouncedReverbPing = debounce((api_key: string) => {pingPlatform('reverb', api_key)}, 1000);

    // Handlers
    
    /**
     * On API Field change
     * 
     * @param platform_id ID of the platform for which the key was changed
     * @param value new value (API key) of the input
     */
    const handleAPIKeyChange = (platform_id: PlatformID, api_key: string) => {
        switch (platform_id){
            case 'reverb':
                debouncedReverbPing(api_key)
                break;
            case 'ebay':
                break;
        }
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
                        <APIKeyField
                            status={platformStatuses.reverb}
                            label='Reverb API key'
                            name='reverb_key'
                            onChange={(e) => handleAPIKeyChange('reverb', e.currentTarget.value)}
                        />
                    </Form>
                </Formik>
            </section>
        </SessionPage>
    )
}