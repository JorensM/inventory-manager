// Core
import { useEffect, useState, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

// Hooks
import useAuth from '@/hooks/useAuth';

// Constants
import routes from '@/constants/routes';

// Types
import { Category } from '@/types/Category';
import { Listing } from '@/types/Listing';
import { Image } from '@/types/File';

// Components
import ListingManager from '@/classes/ListingManager';
import BackButton from '@/components/buttons/BackButton';
import ImageUpload from '@/components/input/ImageUpload';
import SelectInput from '@/components/input/SelectInput';
import TextInput from '@/components/input/TextInput';
import SessionPage from '@/components/layout/SessionPage';
import FilesManager from '@/classes/FilesManager';
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
    category_id?: string,
    condition: 'used' | 'non_functioning',
    images: { add: Image[], remove: string[] }
}

export default function ListingEditPage() {

    

    // Hooks
    const { listing, categories } = useLoaderData() as { listing: Listing | null, categories: Category[] }

    // State
    const initialValues = useMemo<FormValues>(() => {
        if(!listing) {
            return {
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
                condition: "used",
                category_id: undefined,
                images: { add: [], remove: []}
            }
        }
        const { category, ...filteredListing } = listing;
        return {
            ...filteredListing,
            category_id: filteredListing.category_id?.toString(),
            images: { add: [], remove: []}
        }
        // listing ? {
        //     ...listing,
        //     category_id: listing.category_id?.toString(),
        //     images: { add: [], remove: []}
        // } : 
        // {
        //     title: "",
        //     brand: "",
        //     model: "",
        //     fretboard_material: "",
        //     neck_material: "",
        //     finish_color: "",
        //     country_of_manufacture: "",
        //     handedness: 'right_handed',
        //     body_type: "",
        //     string_configuration: "",
        //     condition: "used",
        //     category_id: undefined,
        //     images: { add: [], remove: []}
        // })
    }, []);
        
    // const { listing_id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    // const listings = useListings();

    //const supabase = createClient();

    const text = listing ? text_edit : text_create;

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

    useEffect(() => {
        // fetchListingIfEditMode();
    }, []);

    /* 
        #TODO: Fields:
            * Category
    */

    const handleSubmit = async (values: FormValues) => {
        await auth.fetchUser();

        console.log(values);

        const category_id = values.category_id == "none" ? null : parseInt(values.category_id!);

        const { images, ...valuesWithoutImages } = values;

        const files_to_upload = images.add.map(image => image.file!);

        let image_paths = await FilesManager.uploadFiles(files_to_upload);

        delete values.category_id;

        if(listing) {
            image_paths = [...image_paths, ...(listing.images || [])]
            image_paths = image_paths.filter((path) => {
                return !images.remove.includes(path);
            });

            if(images.remove.length) {
                await FilesManager.deleteFiles('listing_images', images.remove);
            }
            

        }
        

        const data_to_submit = {
            ...valuesWithoutImages,
            category_id,
            user_id: auth.user!.id,
            team_id: auth.user!.team,
            images: image_paths
        }

        let id = listing?.id;

        if(id) {
            await ListingManager.updateListing({
                ...data_to_submit,
                id
            });
        } else {
            id = await ListingManager.createListing(data_to_submit);
        }
        
        navigate(routes.listing(id!));
    }

    return (
        <SessionPage>
            <section>
                <BackButton/>
                <h1>{text.heading}</h1>
                <Formik<FormValues>
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
                        <SelectInput
                            label='Category'
                            name='category_id'
                            options={[ { value: "none", label: '-' }, ...categories.map(category => ({
                                value: category.id.toString(),
                                label: category.name
                            }))]}
                        />
                        <ImageUpload
                            images={listing?.images ? listing?.images.map(image_path => {
                                const url = FilesManager.getPublicURLS('listing_images', [image_path])[0];
                                return {
                                    path: image_path,
                                    url
                                }
                            }) : undefined}
                            label="Images"
                            name="images"
                        />
                        {/* <input type='hidden' name='id' value={listing_id}/> */}
                        <button>
                            {text.submit}
                        </button>
                    </Form>
                </Formik>
            </section>
        </SessionPage>
        
    );
}