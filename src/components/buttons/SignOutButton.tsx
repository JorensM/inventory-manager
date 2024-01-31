'use client';

// Util
import { supabase } from '@/util/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {

    const router = useRouter();

    const handleClick = async () => {
        // fetch(routes.api.signout, {method: "POST"});
        await supabase.auth.signOut();
        console.log('aaa');
        //router.refresh();
        router.push('/');
    };

    return (
        <button
            className='text-btn warn'
            onClick={handleClick}
        >
            Sign out
        </button>
    );
}