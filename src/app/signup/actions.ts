'use server';
// Core
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Util
import { createClient } from '@/util/supabase/actions';
import createTeamForUser from '@/util/createTeamForUser';

export async function signup(formData: FormData) {
    const supabase = createClient();
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        team_name: formData.get('team_name') as string
    };
  
    const password = formData.get('password');

    if (!password || typeof password != 'string') {
        throw new Error('Missing password');
    } else if (password.length < 5 || password.length > 32) {
        throw new Error('Password must be between 5 and 32 characters');
    }

    const { data: { user }, error } = await supabase.auth.signUp({
        email: data.email,
        password: password
    });

    if (error) throw error;

    if (!user) {
        throw new Error('Could not create new user');
    }

    const supabase_admin = createClient(true);
    
    createTeamForUser(supabase_admin, user, data.team_name);
  
    revalidatePath('/', 'layout');
    redirect('/signup/success');
  }