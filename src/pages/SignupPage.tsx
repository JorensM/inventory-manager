import { Field, Form, Formik } from 'formik';
import supabase from '../util/supabase';
import { useState } from 'react';
import LandingPage from '@/components/layout/LandingPage';


type FormValues = {
    email: string,
    password: string
}

/**
 * Sign up page
 */
export default function SignupPage() {
    
    // State
    /**
     * Error message
     */
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    /**
     * Whether sign up was successful, in which case display 'sent email' message
     */
    const [ success, setSuccess ] = useState<boolean>(false);

    // Handlers

    /**
     * On form submit. Creates new user, sends confirmation email and shows a success message
     * @param values form values
     */
    const handleSubmit = async ({ email, password }: FormValues) => {
        setErrorMessage(null)
        const { error } = await supabase.auth.signUp({email, password});
        if(error){
            setErrorMessage('Error')
            throw error
        }

        setSuccess(true);
    }

    return (
      <LandingPage>
        <section className='auth'>
            <div className='form-container'>
                <h2>Sign up</h2>
                {success ? 
                    <>  
                        <h3>Registration successful</h3>
                        <p>A confirmation link has been sent to your email address</p>
                    </>
                :
                    <Formik<FormValues>
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" required />
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" required />
                            {errorMessage ? <span className='warn'>{errorMessage}</span> : null }
                            <button>Sign up</button>
                        </Form>
                    </Formik>
                }
            </div>
        </section>
      </LandingPage>
      
    );
}