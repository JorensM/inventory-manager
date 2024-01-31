// Actions
//import { submitNew, submitEdit } from './actions';

// Components
import BackButton from '@/components/buttons/BackButton';
import SelectInput from '@/components/input/SelectInput';
import TextInput from '@/components/input/TextInput';
import SessionPage from '@/components/layout/SessionPage';
import routes from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import useListings from '@/hooks/useListings';
import supabase from '@/util/supabase';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import { createClient } from '@/util/supabase/server';

const text_create = {
    heading: 'New Listing',
    submit: 'Create listing'
};

const text_edit = {
    heading: 'Edit listing',
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

type FormValues = {
    title: string,
    brand: string,
    model: string,
    finish_color: string,
    country_of_manufacture: string,
    handedness: 'right_handed' | 'left_handed',
    body_type: string,
    string_configuration: string,
    fretboard_material: string,
    neck_material: string,
    condition: 'used' | 'non_functioning'
}

export default function ListingEditPage() {

    // State
    const [ initialValues, setInitialValues ] = useState<FormValues>({
        title: "",
        brand: "",
        model: "",
        fretboard_material: "",
        neck_material: "",
        finish_color: "",
        country_of_manufacture: "",
        handedness: 'right_handed',
        body_type: "",
        string_configuration: "",
        condition: "used"

    })

    // Hooks
    const { listing_id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    const listings = useListings();

    //const supabase = createClient();

    const text = listing_id ? text_edit : text_create;

    let err_message = null;

    // if (listing_id) {
    //     const { data: listings, error } = await supabase
    //     .from('listings')
    //     .select()
    //     .limit(1)
    //     .eq('id', listing_id);

    //     if (error) throw error;
        
    //     const listing = listings[0];

    //     if (!listing) {
    //         err_message = "Could not find listing";
    //     } else {
    //         console.log(listing);
    //         initial_values = {
    //             ...listing
    //         };
    //     }
    // }

    // const setInitialValues = (fields_obj: TextFieldsObj, initial_values: { [name: string]: string}) => {
    //     for(const key in fields_obj) {
    //         const initial_value_key = Object.keys(initial_values).find(init_val_key => init_val_key == key);

    //         if(initial_value_key) {
    //             fields_obj[key].defaultValue = initial_values[initial_value_key];
    //         }
    //     }
    // };

    const text_fields_1: TextFieldsObj = {
        title: {
            label: "Title",
            required: true
        },
        brand: {
            label: "Brand",
            required: true
        },
        model: {
            label: "Model",
            required: true
        },
        finish_color: {
            label: "Finish color"
        },
        country_of_manufacture: {
            label: "Country of manufacture",
            list: 'country_of_manufacture'
        }
    };

    const text_fields_2: TextFieldsObj = {
        body_type: {
            label: "Body type"
        },
        string_configuration: {
            label: "String configuration"
        },
        fretboard_material: {
            label: "Fretboard material"
        },
        neck_material: {
            label: "Neck material"
        }
    };

    // setInitialValues(text_fields_1, initial_values);
    // setInitialValues(text_fields_2, initial_values);
    
    

    const fetchListingIfEditMode = async () => {
        if(listing_id) {
            const _listing = await listings.fetchListing(parseInt(listing_id));

            console.log(_listing);
            setInitialValues({
                ..._listing
            });
        }
        
    }

    useEffect(() => {
        fetchListingIfEditMode();
    }, []);

    /* 
        #TODO: Fields:
            * Category
    */

    const handleSubmit = async (values: FormValues) => {
        await auth.fetchUser();
        
        let query: any = supabase.from('listings');

        const data_to_submit = {
            ...values,
            user_id: auth.user!.id,
            team_id: auth.user!.team
        }

        // Update listing
        if(listing_id) {
            query = query.update(data_to_submit).eq('id', listing_id);
        } // Create new listing 
        else {
            query = query.insert(data_to_submit);
        }

        const { data, error } = await query.select();
            
        if(error) throw error

        const listing = data[0];

        navigate(routes.listing(listing.id));
    }

    return (
        <SessionPage>
            <section>
                <BackButton/>
                <h1>{text.heading}</h1>
                
                {err_message || 
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            {Object.entries(text_fields_1).map(([name, field]) => (
                                <TextInput
                                    key={name}
                                    name={name}
                                    {...field}
                                />
                            ))}
                            <datalist id='country_of_manufacture'>
                                <option value='USA'/>
                                <option value='Mexico'/>
                                <option value='China'/>
                                <option value='Korea'/>
                                <option value='Japan'/>
                            </datalist>
                            <SelectInput
                                label='Handedness'
                                name='handedness'
                                options={[
                                    {
                                        value: 'right_handed',
                                        label: 'Right handed'
                                    },
                                    {
                                        value: 'left_handed',
                                        label: 'Left handed'
                                    }
                                ]}
                                defaultValue='right_handed'
                                required
                            />
                            {Object.entries(text_fields_2).map(([name, field]) => (
                                <TextInput
                                    key={name}
                                    name={name}
                                    {...field}
                                />
                            ))}
                            <SelectInput
                                name='condition'
                                options={[
                                    {
                                        value: 'used',
                                        label: 'Used'
                                    },
                                    {
                                        value: 'non_functioning',
                                        label: "Non-functioning"
                                    }
                                ]}
                                label='Condition'
                                required
                            />
                            {/* <input type='hidden' name='id' value={listing_id}/> */}
                            <button>
                                {text.submit}
                            </button>
                        </Form>
                    </Formik>
                    
                }
                
            </section>
        </SessionPage>
        
    );
}