// Core
import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import useAuth from '@/hooks/useAuth';

// Constants
import routes from '@/constants/routes';

type PageProps = {

}

export default function Page( { children }: PropsWithChildren<PageProps> ) {

    // Hooks
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();

    /**
     * If necessary, redirect the user to appropriate pages depending on whether
     * they are logged in or not
     */
    const validateSessionAndMaybeRedirect = async () => {
        const session = await auth.getSession();
        if(!session && location.pathname.startsWith('/app')) {
            navigate(routes.login);
        } else if (session && ['/login', '/signup'].includes(location.pathname)) {
            navigate(routes.dashboard);
            //await auth.fetchUser();
        }

        if(session) {
            await auth.fetchUser();
        }
    }

    useEffect(() => {
        console.log('validating')
        validateSessionAndMaybeRedirect();
    }, [ location.pathname ])

    return (
        <>
            {children}
        </>
        
    )
}