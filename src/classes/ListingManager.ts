// Util
import supabase from '@/util/supabase';

// Types
import { Listing, ListingCreate, ListingUpdate } from '@/types/Listing';
import user from './UserManager';

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
        console.log(listing);
        const { error } = await supabase.from('listings')
            .update({
                ...listing,
                category_id: listing.category_id || null,
            })
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

    /**
     * Create a listing according to passed ListingCreate object
     * @param listing ListingCreate object
     * 
     * @returns ID of newly created listing
     */
    static async createListing (listing: ListingCreate) {
        const team = user.getTeam();

        if(!team) {
            throw new Error('User team not found')
        }

        const listing_data: any = {
            ...listing,
            category_id: listing.category_id || null,
            team_id: team.id
        }

        const { data: listings, error } = await supabase.from('categories')
            .insert(listing_data)
            .select();

        if (error) throw error;

        return listings[0].id;
    }
}