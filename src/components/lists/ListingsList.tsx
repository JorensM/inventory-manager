import { Listing } from '@/types/Listing'

type ListingSmallProps = {
    data: Listing
}

function ListingSmall( { data }: ListingSmallProps) {
    return (
        <div>
            {data.title}
        </div>
    )
}

type ListingsListProps = {
    listings: Listing[]
}

export default function ListingsList( { listings }: ListingsListProps) {
    return (
        <ul>
            {listings.map(listing => (
                <ListingSmall
                    data={listing}
                />
            ))}
        </ul>
    )
}