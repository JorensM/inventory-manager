import supabase from '@/util/supabase'

export default function useListings() {

    return {
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
        }
    }
}