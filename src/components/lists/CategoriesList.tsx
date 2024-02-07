// Core
import { useNavigate } from 'react-router-dom';

// Types
import { Category } from '@/types/Listing'

// Components
import GenericListItem from './GenericListItem';

// Constants
import routes from '@/constants/routes';


type CategoriesListProps = {
    categories: Category[]
}

export default function ListingsList( { categories }: CategoriesListProps) {

    const navigate = useNavigate()

    const handleCategoryClick = (category_id: number) => {
        navigate(routes.category(category_id))
    };

    return (
        <ul>
            {categories.map(category => (
                <GenericListItem
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    label={category.name}
                />
            ))}
        </ul>
    );
}