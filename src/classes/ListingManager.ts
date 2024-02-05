// Util
import { ListingUpdate } from '@/types/Listing';
import supabase from '@/util/supabase';

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

        if(error) throw error;
    }
}