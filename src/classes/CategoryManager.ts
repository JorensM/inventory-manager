// Classes
import user from './UserManager';

// Util
import supabase from '@/util/supabase';

// Types
import { CategoryCreate, CategoryUpdate } from '@/types/Category';

export default class CategoryManager {
    /**
     * Fetch single category by ID
     * @param id 
     */
    static async fetchCategory(category_id: number) {
        if(!category_id) {
            return null;
        }

        const { data: categories, error } = await supabase.from('categories')
            .select()
            .eq('id', category_id)
            .limit(1);

        if (error) throw error;

        if(categories.length == 0) {
            return null;
        }

        

        return categories[0]
    }

    /**
     * Fetch all categories of user's current team
     * 
     * @returns array of Category objects
     */
    static async fetchCategories() {
        const team = user.getTeam();

        if(!team) {
            throw new Error('User team not found')
        }

        const { data, error } = await supabase.from('categories')
            .select()
            .eq('team_id', team.id)

        if (error) throw error;

        return data;
    }

    /**
     * Create new category
     * @param category CategoryCreate object
     * @returns ID of newly created category
     */
    static async createCategory(category: CategoryCreate) {

        const team = user.getTeam();

        if(!team) {
            throw new Error('User team not found')
        }

        const category_data: CategoryCreate = {
            ...category,
            team_id: team.id
        }

        const { data: categories, error } = await supabase.from('categories')
            .insert(category_data)
            .select();

        if (error) throw error;

        return categories[0].id;
    }

    /**
     * Update category
     * @param category CategoryUpdate object 
     */
    static async updateCategory(category: CategoryUpdate) {
        const { error } = await supabase.from('categories')
            .update(category)
            .eq('id', category.id);

        if (error) throw error;
    }
}