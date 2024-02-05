// Types
import { ListingUpdate } from '@/types/Listing';

// Util
import supabase from '@/util/supabase'

export default function useListings() {

    return {
        /**
         * Fetch listing from DB
         * @param listing_id ID of listing
         * @returns Listing object of corresponding listing
         */
        fetchListing: async (listing_id: number) => {
            const { data: listings, error } = await supabase.from('listings')
                .select()
                .eq('id', listing_id)
                .limit(1);

            if (error) throw error;

            if(listings.length == 0) {
                return null;
            }

            return listings[0]
        },
        /**
         * Update listing in DB
         * @param listing Listing object to update. `id` property needs to be set on the object
         */
        updateListing: async(listing: ListingUpdate) => {
            const { error } = await supabase.from('listings')
                .update(listing)
                .eq('id', listing.id)

            if(error) throw error;

        }
    }
}