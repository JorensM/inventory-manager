import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Constants
import { SUPABASE_ANON_KEY, SUPABASE_ADMIN_KEY, SUPABASE_URL } from '@/constants/env';

export function createClient(admin: boolean = false) {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin ? process.env.SUPABASE_ADMIN_KEY! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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