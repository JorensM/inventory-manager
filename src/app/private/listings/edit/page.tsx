
// Actions
import { submitNew, submitEdit } from './actions'

// Components
import BackButton from '@/components/buttons/BackButton'
import SelectInput from '@/components/input/SelectInput'
import TextInput from '@/components/input/TextInput'

const text_create = {
    heading: 'New Listing',
    submit: 'Create listing'
}

const text_edit = {
    heading: 'Edit listing',
    submit: 'Save'
}

export default function ListingEditPage({ searchParams: { id: listing_id }}: {
    searchParams: { id: string }
}) {

    const text = listing_id ? text_edit : text_create

    const text_fields_1 = {
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
    }

    const text_fields_2 = {
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
            label: "Fretboard material"
        }
    }

    /* 
        #TODO: Fields:
            * Category
    */

    return (
        <section>
            <BackButton/>
            <h1>{text.heading}</h1>
            <form>
                {Object.entries(text_fields_1).map(([name, field]) => (
                    <TextInput
                        key={name}
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
                    default_value='right_handed'
                />
                {Object.entries(text_fields_2).map(([name, field]) => (
                    <TextInput
                        key={name}
                        {...field}
                    />
                ))}
                <SelectInput
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
                />
                <button
                    formAction={listing_id ? submitEdit : submitNew}
                >
                    {text.submit}
                </button>
            </form>
        </section>
    )
}