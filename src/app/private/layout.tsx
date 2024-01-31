import SignOutButton from '@/components/buttons/SignOutButton';
import { createClient } from '@/util/supabase/server';

export default async function PrivateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if(error) throw error;

    return (
        <>
            <header>
                <p>Hello {data.user.email}</p>
                <SignOutButton/>
            </header>
            <main className='private'>
                {children}
            </main>
        </>
        
    );
}
  