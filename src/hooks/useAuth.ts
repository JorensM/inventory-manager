// Core
import { useContext } from 'react';

// Types
import AuthContext from '@/state/AuthContext';

// Utils
import supabase from '@/util/supabase';

export default function useAuth() {

    const context = useContext(AuthContext);
    
    return {
        user: context.user,
        fetchUser: async () => {
            const { data: { user: _user }, error } = await supabase.auth.getUser();

            if (error) throw error;

            if (_user) {
                context.setUser({
                    id: _user.id,
                    email: _user.email!,
                    team: 1 // #TODO: Implement teams
                })
            } else {
                context.setUser(null);
            }
            
        },
        fetchTeam: async () => {
            if (!context.user) {
                throw new Error('User not logged in')
            }

            const { data: teams, error } = await supabase.from('teams')
                .select()
                .contains('users', [context.user.id]);

            if(error) throw error;

            if(teams.length == 0) {
                return null;
            }

            return teams[0];
        },
        createTeam: async (name: string) => {
            if (!context.user) {
                throw new Error('Cannot create team: user not found')
            }
            const { error } = await supabase.from('teams')
                .insert({
                    name,
                    users: [context.user.id]
                })

            if(error) throw error
        },
        getSession: async () => {
            const {data: { session }, error } = await supabase.auth.getSession();
            
            if (error) throw error;

            return session;
        },
        login: async (email: string, password: string) => {
            const { error } = await supabase.auth.signInWithPassword({email, password});

            if (error) throw error;
        },
        logout: async () => { 
            const { error } = await supabase.auth.signOut();

            if (error) throw error;
        } 
    }

}