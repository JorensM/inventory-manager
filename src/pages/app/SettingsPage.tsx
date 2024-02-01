// Components
import SessionPage from '@/components/layout/SessionPage';
import APIKeyField from '@/components/input/APIKeyField';
import { Form, Formik } from 'formik';



/**
 * The settings page
 */
export default function SettingsPage() {

    // Functions
    
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
                    initialValues={{}}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <APIKeyField
                            status='success'
                            label='Reverb API key'
                            name='reverb_key'
                        />
                    </Form>
                </Formik>
            </section>
        </SessionPage>
    )
}