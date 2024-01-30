import { Listing } from '@/types/Listing'
import ListingSmall from './ListingSmall'
import { redirect } from 'next/navigation'



type ListingsListProps = {
    listings: Listing[]
}

export default function ListingsList( { listings }: ListingsListProps) {

    const handleListingClick = (listing_id: Number) => {
        redirect('/private/listings/' + listing_id)
    }

    return (
        <ul>
            {listings.map(listing => (
                <ListingSmall
                    onClick={handleListingClick(listing.id)}
                    data={listing}
                />
            ))}
        </ul>
    )
}