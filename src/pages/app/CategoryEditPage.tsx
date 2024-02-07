// Core
import { Form, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

// Components
import BackButton from '@/components/buttons/BackButton';
import SelectInput from '@/components/input/SelectInput';
import TextInput from '@/components/input/TextInput';
import SessionPage from '@/components/layout/SessionPage';

// Constants
import routes from '@/constants/routes';

// Hooks
import useAuth from '@/hooks/useAuth';

// Types
import { Category } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';

// Util
import supabase from '@/util/supabase';

const text_create = {
    heading: 'New Category',
    submit: 'Create category'
};

const text_edit = {
    heading: 'Edit category',
    submit: 'Save'
};

type TextFieldsObj = {
    [name: string]: {
        label: string,
        required?: boolean,
        defaultValue?: string,
        list?: string
    }
}

type FormValues = Record<`${PlatformID}`, string> & {
    name: string
}

export default function CategoryEditPage() {

    // State

    // Hooks
    const { category } = useLoaderData() as { category: Category | null};
    const navigate = useNavigate();
    const auth = useAuth();

    const text = category ? text_edit : text_create;

    //-- Memo --//

    const initialValues: FormValues = useMemo(() => {
        if (category) return ({
            name: category.name,
            reverb: category.reverb || '',
            ebay: category.ebay || ''
        })
        else return ({
            name: '',
            reverb: '',
            ebay: ''
        })
    }, [])

    /* 
        #TODO: Fields:
            * Category
    */

    const handleSubmit = async (values: FormValues) => {
        // await auth.fetchUser();
        
        // let query: any = supabase.from('listings');

        // const data_to_submit = {
        //     ...values,
        //     user_id: auth.user!.id,
        //     team_id: auth.user!.team
        // }

        // // Update listing
        // if(listing_id) {
        //     query = query.update(data_to_submit).eq('id', listing_id);
        // } // Create new listing 
        // else {
        //     query = query.insert(data_to_submit);
        // }

        // const { data, error } = await query.select();
            
        // if(error) throw error

        // const listing = data[0];

        // navigate(routes.listing(listing.id));
    }

    return (
        <SessionPage>
            <section>
                <BackButton/>
                <h1>{text.heading}</h1>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        
                        <button>
                            {text.submit}
                        </button>
                    </Form>
                </Formik>
            </section>
        </SessionPage>
        
    );
}