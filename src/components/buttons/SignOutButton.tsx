// Core
import { useNavigate } from 'react-router-dom';

// Hooks
import useAuth from '@/hooks/useAuth';

/**
 * Sign out button. Signs user out and redirects them to landing page
 */
export default function SignOutButton() {

    // Hooks
    const auth = useAuth();
    const navigate = useNavigate();

    //-- Handlers --//

    /**
     * Handle click. Logs user out and redirects to landing page
     */
    const handleClick = async () => {
        await auth.logout();
        navigate('/')
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