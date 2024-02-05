// Core
import { useNavigate } from 'react-router-dom';

/**
 * Back button, navigates to the previous page in history
 */
export default function BackButton(){

    // Hooks
    const navigate = useNavigate();

    return (
        <div
            className='link'
            onClick={() => navigate(-1)}
        >
            Back
        </div>
    );
}