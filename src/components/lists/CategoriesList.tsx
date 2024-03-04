// Core
import { useNavigate } from 'react-router-dom';

// Types
import { Category } from '@/types/Category'

// Components
import GenericListItem from './GenericListItem';

// Constants
import routes from '@/constants/routes';


type CategoriesListProps = {
    /**
     * Categories to display
     */
    categories: Category[]
}

/**
 * Component for displaying a list of categories
 */
export default function CategoriesList( { categories }: CategoriesListProps) {

    //-- Hooks --//
    const navigate = useNavigate()

    //-- Handlers --//

    /**
     * On list item click. Navigates to appropriate category
     * @param category_id ID of category to navigate to
     */
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