import { useNavigate } from 'react-router-dom';

export default function BackButton(){

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