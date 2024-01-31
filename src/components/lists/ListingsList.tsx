'use client';

// Types
import { Listing } from '@/types/Listing';

// Components
import ListingSmall from './ListingSmall';
import routes from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

type ListingsListProps = {
    listings: Listing[]
}

export default function ListingsList( { listings }: ListingsListProps) {

    const navigate = useNavigate()

    const handleListingClick = (listing_id: number) => {
        navigate(routes.listing(listing_id))
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