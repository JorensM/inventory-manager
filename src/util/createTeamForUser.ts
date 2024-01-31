import { SupabaseClient, User } from '@supabase/supabase-js';

/**
 * Creates a team for a given user. This should be only called on server side as it uses supabase admin client
 * @param supabase Supabase client, must be an admin client
 * @param user User object
 * @param team_name Name of team
 */
export default async function createTeamForUser(supabase: SupabaseClient, user: User, team_name: string) {
    const { error } = await supabase.from('teams')
        .insert({
            name: team_name,
            users: [ user.id ]
        });
    if(error) throw error;
}