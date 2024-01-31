import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../util/supabase';
import { useState } from 'react';


type FormValues = {
    email: string,
    password: string
}

export default function LoginPage() {

    const navigate = useNavigate();
    
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    const handleSubmit = async ({ email, password}: FormValues) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({email, password});
            navigate('/app/dashboard');
        } catch (err) {
            setErrorMessage('Error');
            throw err;
        }

        
    }

    return (
      <>
        <header className='auth'>
          <h1><Link to='/'>Inventory Manager</Link></h1>
        </header>
        <main className='auth'>
          <section>
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
                    {errorMessage ? <span className='warn'></span> : null }
                    <button>Log in</button>
                </Form>
            </Formik>
            
          </section>
        </main>
      </>
      
    );
  }