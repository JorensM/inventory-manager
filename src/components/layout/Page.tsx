// Core
import { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import useAuth from '@/hooks/useAuth';

// Util
import isOnline from '@/util/isOnline';

// Constants
import routes from '@/constants/routes';

export default function Page( { children }: PropsWithChildren ) {

    //-- Hooks --//
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();

    //-- State --//
    const [ isOffline, setIsOffline ] = useState(false);

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

    const checkIfOffline = async () => {
        setIsOffline(!(await isOnline()))
    }

    // Validate session on route change
    useEffect(() => {
        checkIfOffline();

        validateSessionAndMaybeRedirect();
    }, [ location.pathname ])

    return (
        isOffline ?
            <div className='error-container'>
                You seem to be offline, please check your internet connection and refresh the page
            </div>
        : 
            <>
                {children}
            </>
    )
}