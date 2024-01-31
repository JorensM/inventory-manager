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

    /**
     * Check if user has a team created and if not redirect them to team creation page
     */
    const validateTeam = async () => {
        const team = await auth.fetchTeam();

        console.log(team);

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
        validateTeam();
    }, [auth.user])

    useEffect(() => {
        validateSession();
    }, [ location.pathname ])

    return (
        auth.user ?
            <>
                <header>
                    <p>Hello {auth.user!.email}</p>
                    <SignOutButton/>
                </header>
                <main className='app'>
                    { children }
                </main>
            </>
        : 'Loading'
        
    )
}