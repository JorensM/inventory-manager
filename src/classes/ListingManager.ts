// Util
import supabase from '@/util/supabase';

// Types
import { Listing, ListingUpdate } from '@/types/Listing';

export default class ListingManager {
    static async fetchListing (listing_id: number) {
        const { data: listings, error } = await supabase.from('listings')
            .select()
            .eq('id', listing_id)
            .limit(1);

        if (error) throw error;

        if(listings.length == 0) {
            return null;
        }

        return listings[0]
    }

    static async updateListing (listing: ListingUpdate) {
        const { error } = await supabase.from('listings')
            .update(listing)
            .eq('id', listing.id)

        if (error) throw error;
    }

    /**
     * Delete a listing from DB, and optionally from the platforms as well
     * @param listing Listing object to delete
     * @param delete_on_platforms Whether to delete listing on platforms as well
     */
    static async deleteListing (listing: Listing) {
        const { error } = await supabase.from('listings')
            .delete()
            .eq('id', listing.id)

        if (error) throw error;
    }
}