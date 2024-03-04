// Util
import { Team } from '@/types/User';
import supabase from '@/util/supabase';

/**
 * Class for managing the user
 */
class UserManager {

    /**
     * The user's team or null if team not set/not logged in
     */
    team: Team | null = null;

    constructor() {
        this.revalidate();
    }

    /**
     * Get user's team
     * @returns User's team or null if team not set/not logged in
     */
    getTeam() {
        return this.team;
    }

    /**
     * Revalidate user and fetch user data
     * @returns 
     */
    async revalidate() {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) throw error;

        if (!user) {
            this.team = null;

            return;
        }

        const { data: teams, error: teams_error } = await supabase.from('teams')
            .select()
            .contains('users', [user.id])

        if (teams_error) throw teams_error;

        if(teams.length) {
            this.team = teams[0];
        }

        //if (!user) throw new Error('Could not get user')
    }
}

// Create instance and export it as singleton
const user = new UserManager();
export default user;