import supabase from '@/util/supabase';

export default class CategoryManager {
    /**
     * Fetch single category by ID
     * @param id 
     */
    static async fetchCategory(category_id: number) {
        const { data: categories, error } = await supabase.from('listings')
            .select()
            .eq('id', category_id)
            .limit(1);

        if (error) throw error;

        if(categories.length == 0) {
            return null;
        }

        return categories[0]
    }
}