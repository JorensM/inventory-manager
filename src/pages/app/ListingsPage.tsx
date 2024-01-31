import ListingsList from '@/components/lists/ListingsList';
import { Listing } from '@/types/Listing';
import supabase from '@/util/supabase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListingsPage() {

    // const supabase = createClient();

    const [ listings, setListings ] = useState<Listing[]>([]);

    const fetchListings = async () => {
        const { data: _listings, error } = await supabase
            .from('listings')
            .select();

        if (error) {
            throw error;
        }

        setListings(_listings);
    }

    useEffect(() => {
        fetchListings();
    }, [])

    

    

    return (
        <section>
            <Link to='/app/dashboard'>Back to dashboard</Link>
            <h1>Listings</h1>
            {listings.length ? 
                <ListingsList
                    listings={listings}
                />
            :
                <>
                    <p>You don&apos;t have any listings</p>
                    <Link to='/app/listings/edit'>Create listing</Link>
                </>
            }
            
        </section>
    );
}