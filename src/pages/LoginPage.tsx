import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../util/supabase';
import { useState } from 'react';
import LandingPage from '@/components/layout/LandingPage';


type FormValues = {
    email: string,
    password: string
}

export default function LoginPage() {

    const navigate = useNavigate();
    
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    const handleSubmit = async ({ email, password}: FormValues) => {
        setErrorMessage(null)
        const { error } = await supabase.auth.signInWithPassword({email, password});
        if(error){
            setErrorMessage('Error')
            throw error
        }
        navigate('/app/dashboard');
        
    }

    return (
      <LandingPage>
        <section className='auth'>
          <div className='form-container'>
            <h2>Log in</h2>
            <Formik<FormValues>
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="email">Email:</label>
                    <Field type="email" name="email" required/>
                    <label htmlFor="password">Password:</label>
                    <Field type="password" name="password" required/>
                    {errorMessage ? <span className='warn'>{errorMessage}</span> : null }
                    <button>Log in</button>
                </Form>
            </Formik>
          </div>
        </section>
      </LandingPage>
      
    );
  }