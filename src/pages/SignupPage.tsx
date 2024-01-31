import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../util/supabase';
import { useState } from 'react';


type FormValues = {
    email: string,
    password: string
}

export default function SignupPage() {

    const navigate = useNavigate();
    
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    const [ success, setSuccess ] = useState<boolean>(false);

    const handleSubmit = async ({ email, password}: FormValues) => {
        setErrorMessage(null)
        const { error } = await supabase.auth.signUp({email, password});
        if(error){
            setErrorMessage('Error')
            throw error
        }

        setSuccess(true);
        // navigate('/app/dashboard');
        
    }

    return (
      <>
        <header className='auth'>
          <h1><Link to='/'>Inventory Manager</Link></h1>
        </header>
        <main className='auth'>
          <section>
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
                        <label htmlFor="email">Email:</label>
                        <Field type="email" name="email" required/>
                        <label htmlFor="password">Password:</label>
                        <Field type="password" name="password" required/>
                        {errorMessage ? <span className='warn'>{errorMessage}</span> : null }
                        <button>Sign up</button>
                    </Form>
                </Formik>
            }
          </section>
        </main>
      </>
      
    );
}