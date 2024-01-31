'use server';

// Core
import { redirect } from 'next/navigation';

// Types
import { Listing } from '@/types/Listing';

// Util
import routes from '@/util/routes';
import { createClient } from '@/util/supabase/actions';

const createOrUpdateListing = async (type: 'create' | 'update', formData: FormData) => {
    const supabase = createClient();

    const { data: { user }, error: user_error } = await supabase.auth.getUser();

    if (user_error) {
        throw user_error;
    }

    if(!user) {
        throw new Error('Could not get user');
    }

    const form_data: {[key: string]: any} = {};

    for(const key of formData.keys()) {
        form_data[key] = formData.get(key);
    }

    const data: Listing = {
        ...form_data,
        id: parseInt(form_data.id),
        user_id: user.id,
        team_id: 0 //#TODO: Replace with actual team id once teams are implemented
    } as Listing;
    
    console.log(data);

    //let listings;

    let query: any = supabase.from('listings');

    if(type == 'create') {
        query = query.insert(data);
    } else {
        query = query.update(data);
    }

    const { data: listings, error } = await query.eq('id', data.id).select();

    if (error) throw error;

    const listing = listings![0] as Listing;

    return redirect(routes.listing(listing.id));
};

export async function submitNew(formData: FormData) {
    return createOrUpdateListing('create', formData);
}

export async function submitEdit(formData: FormData) {
    return createOrUpdateListing('update', formData);
}