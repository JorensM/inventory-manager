import AuthContext from '@/state/AuthContext';
import supabase from '@/util/supabase';
import { useContext } from 'react';

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