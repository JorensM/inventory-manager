// Core
import { PropsWithChildren, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Constants
import routes from '@/constants/routes';

// Hooks
import useAuth from '@/hooks/useAuth';

// Components
import SignOutButton from '@/components/buttons/SignOutButton';



type SessionPageProps = {

}

export default function SessionPage( { children }: PropsWithChildren<SessionPageProps>) {

    // Hooks
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * Check if user has a team created and if not redirect them to team creation page
     */
    const validateTeam = async () => {
        const team = await auth.fetchTeam();

        if (!team) {
            navigate(routes.new_team)
        }
    }

    const validateSession = async () => {
        
        const session = await auth.getSession();
        if(!session) {
            navigate(routes.login)
        } else {
            await auth.fetchUser();
        }
    }

    useEffect(() => {
        if(auth.user) {
            validateTeam();
        }
    }, [auth.user])

    useEffect(() => {
        validateSession();
    }, [ location.pathname ])

    return (
        auth.user ?
            <>
                <header className='app'>
                    <p className='greeting'>Hello {auth.user!.email}</p>
                    <nav>
                        <ul>
                            <li>
                                <Link to={routes.settings}>Settings</Link>
                            </li>
                            <li>
                                <SignOutButton/>
                            </li>
                        </ul>
                    </nav>
                    
                </header>
                <main className='app'>
                    { children }
                </main>
            </>
        : 'Loading'
        
    )
}