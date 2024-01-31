// Core
import { redirect } from 'next/navigation';

// Util
import routes from '@/util/routes';
import { createClient } from '@/util/supabase/server';

export async function POST() {
    const supabase = createClient();
    await supabase.auth.signOut();

    redirect(routes.login);
}