import SessionPage from '@/components/layout/SessionPage';
import routes from '@/constants/routes';
import useListings from '@/hooks/useListings';
import { Listing } from '@/types/Listing';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ListingPage() {

    // State
    const [ listing, setListing ] = useState<Listing | null>(null);

    // Hooks
    const { listing_id } = useParams();
    const listings = useListings();

    
    // Functions
    const fetchListing = async () => {
        const _listing = await listings.fetchListing(parseInt(listing_id!))

        console.log(_listing);

        setListing(_listing);
    }

    useEffect(() => {
        fetchListing()
    }, [])

    return (
        <SessionPage>
            <section>
                <Link to={routes.listings}>Back to listings</Link>
                {listing ? 
                    <>
                        <h1>{listing.title}</h1>
                        <Link to={routes.edit_listing(listing.id)}>Edit</Link>
                    </>
                : "Could not find listing"}
            </section>
        </SessionPage>
        
    );
}