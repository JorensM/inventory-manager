// Core
import { useNavigate } from 'react-router-dom';

// Types
import { Listing } from '@/types/Listing';

// Constants
import routes from '@/constants/routes';

// Components
import ListingSmall from './ListingSmall';

type ListingsListProps = {
    listings: Listing[]
}

/**
 * Component to display a list of listings
 * @param param0 
 * @returns 
 */
export default function ListingsList( { listings }: ListingsListProps) {

    //-- Hooks --//
    const navigate = useNavigate()

    //-- Handlers --//

    /**
     * On listing item click. Navigates to appropriate listings.
     * @param listing_id ID of listing that was clicked on
     */
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