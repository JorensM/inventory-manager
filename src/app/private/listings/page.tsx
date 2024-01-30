import BackButton from '@/components/buttons/BackButton';
import ListingsList from '@/components/lists/ListingsList';
import { createClient } from '@/util/supabase/server';
import Link from 'next/link';

export default async function ListingsPage() {

    const supabase = createClient();

    const { data: listings, error } = await supabase
        .from('listings')
        .select()

    if (error) {
        throw error;
    }

    return (
        <section>
            <Link href='/private/dashboard'>Back to dashboard</Link>
            <h1>Listings</h1>
            {listings.length ? 
                <ListingsList
                    listings={listings}
                />
            :
                <>
                    <p>You don't have any listings</p>
                    <Link href='/private/listings/edit'>Create listing</Link>
                </>
            }
            
        </section>
    )
}