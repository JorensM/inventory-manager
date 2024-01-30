"use server"
import { Listing } from '@/types/Listing';
import { getListingURL } from '@/util/getListingURL';
import { createClient } from '@/util/supabase/server';
import { redirect } from 'next/navigation';

export async function submitNew(formData: FormData) {

    const supabase = createClient();

    const { data: { user }, error: user_error } = await supabase.auth.getUser();

    if (user_error) {
        throw user_error;
    }

    if(!user) {
        throw new Error('Could not get user')
    }

    const data = {
        title: formData.get('title') as string,
        user_id: user.id
    }
    

    const { data: listings, error } = await supabase.from('listings')
        .insert(data)
        .select();
    
    if(error) throw error;

    const listing = listings![0] as Listing;

    redirect(getListingURL(listing.id));
}

export async function submitEdit() {

}