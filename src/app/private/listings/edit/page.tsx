
// Actions
import { submitNew, submitEdit } from './actions'

// Components
import BackButton from '@/components/buttons/BackButton'
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

    return (
        <section>
            <BackButton/>
            <h1>{text.heading}</h1>
            <form>
                <TextInput
                    label="Title"
                    name="title"
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