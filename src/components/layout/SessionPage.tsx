import routes from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import { PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SignOutButton from '../buttons/SignOutButton';



type SessionPageProps = {

}

export default function SessionPage( { children }: PropsWithChildren<SessionPageProps>) {

    // Hooks
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const validateSession = async () => {
        
        const session = await auth.getSession();
        if(!session) {
            navigate(routes.login)
        } else {
            await auth.fetchUser();
        }
    }

    useEffect(() => {
        validateSession();
    }, [ location ])

    return (
        auth.user ?
            <>
                <header>
                    <p>Hello {auth.user!.email}</p>
                    <SignOutButton/>
                </header>
                <main className='private'>
                    { children }
                </main>
            </>
        : 'Loading'
        
    )
}