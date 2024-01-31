'use client';

// Core
import { useRouter } from 'next/navigation';

// Types
import { Listing } from '@/types/Listing';

// Components
import ListingSmall from './ListingSmall';
import routes from '@/util/routes';

type ListingsListProps = {
    listings: Listing[]
}

export default function ListingsList( { listings }: ListingsListProps) {

    const router = useRouter();

    const handleListingClick = (listing_id: number) => {
        // console.log('clicked')
        router.push(routes.listing(listing_id));
    };

    return (
        <ul>
            {listings.map(listing => (
                <ListingSmall
                    key={listing.id}
                    onClick={() => handleListingClick(listing.id)}
                    data={listing}
                />
            ))}
        </ul>
    );
}