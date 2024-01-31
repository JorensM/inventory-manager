'use server';

// Core
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Util
import { createClient } from '@/util/supabase/actions';
import createTeamForUser from '@/util/createTeamForUser';

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: { user }, error } = await supabase.auth.signInWithPassword(data);

  if (!user) {
    redirect('/error');
  }

  const { data: teams_data, error: teams_error } = await supabase.from('teams')
    .select()
    .limit(1)
    .contains('users', [user!.id]);

  if (teams_error) throw teams_error;

  if(teams_data.length == 0) {
    console.log('creating team');
    createTeamForUser(supabase, user, 'My team');
  }

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}