import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function SignOutButton() {

    // Hooks
    const auth = useAuth();
    const navigate = useNavigate();

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