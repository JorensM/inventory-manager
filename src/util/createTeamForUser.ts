import { SupabaseClient, User } from '@supabase/supabase-js';

export default async function createTeamForUser(supabase: SupabaseClient, user: User, team_name: string) {
    const { error } = await supabase.from('teams')
        .insert({
            name: team_name,
            users: [ user.id ]
        });
    if(error) throw error;
}