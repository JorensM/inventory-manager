import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Constants
import { SUPABASE_ANON_KEY, SUPABASE_ADMIN_KEY, SUPABASE_URL } from '@/constants/env';

export function createClient(admin: boolean = false) {
  const cookieStore = cookies();
  return createServerClient(
    SUPABASE_URL,
    admin ? SUPABASE_ADMIN_KEY : SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}