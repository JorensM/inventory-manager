// Util
import { Team } from '@/types/User';
import supabase from '@/util/supabase';

class UserManager {

    team: Team | null = null;

    constructor() {
        this.revalidate();
    }

    getTeam() {
        return this.team;
    }

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

const user = new UserManager();

export default user;