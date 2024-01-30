import { Listing } from '@/types/Listing';
import { createClient } from '@/util/supabase/server'
import Link from 'next/link';

export default async function ListingPage( { params }: { params: { listing_id: number }}) {

    const supabase = createClient();

    const { data, error } = await supabase
        .from('listings')
        .select()
        .limit(1)
        .eq('id', params.listing_id);

    if (error) throw error

    const listing = data[0] as Listing;

    return (
        <section>
            <Link href='/private/dashboard'>Back to listings</Link>
            {listing ? 
                <>
                    <h1>{listing.title}</h1>
                </>
            : "Could not find listing"}
            
        </section>
    )
}