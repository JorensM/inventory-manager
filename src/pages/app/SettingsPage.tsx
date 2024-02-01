// Components
import SessionPage from '@/components/layout/SessionPage';
import APIKeyField from '@/components/input/APIKeyField';



/**
 * The settings page
 */
export default function SettingsPage() {
    return (
        <SessionPage>
            <h1>Settings</h1>
            <ul>
                <li>
                    <APIKeyField
                        status='success'
                        label='Reverb API key'
                        name='reverb_key'
                    />
                </li>
            </ul>
        </SessionPage>
    )
}