// Core
import { PropsWithChildren, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Constants
import routes from '@/constants/routes';

// Hooks
import useAuth from '@/hooks/useAuth';

// Components
import SignOutButton from '@/components/buttons/SignOutButton';
import Page from './Page';



type SessionPageProps = {

}

/**
 * Page wrapper for user pages
 */
export default function SessionPage( { children }: PropsWithChildren<SessionPageProps>) {

    // Hooks
    const auth = useAuth();
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

    useEffect(() => {
        if(auth.user) {
            validateTeam();
        }
    }, [auth.user])

    

    return (
        <Page>
            {auth.user ?
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
            // Display loading message if user is being fetched
            : 'Loading'}
        </Page>
        
        
    )
}