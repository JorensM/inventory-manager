// Core
import { Link, useLoaderData } from 'react-router-dom';

// Components
import SessionPage from '@/components/layout/SessionPage';

// Constants
import routes from '@/constants/routes';
import { Category } from '@/types/Category';

export default function CategoryPage(){

    const { category } = useLoaderData() as { category: Category }

    return (
        <SessionPage>
            <section>
                <Link to={routes.categories}>Back to categories</Link>
            </section>
            <section>
                <h1>{category.name}</h1>
                <Link to={routes.edit_category(category.id)}>Edit category</Link>
                <ul>
                    {category.reverb ? 
                        <li>
                            <b>Reverb ID: </b> {category.reverb}
                        </li>
                    : null}
                    {category.ebay ?
                        <li>
                            <b>eBay ID: </b> {category.ebay}
                        </li>
                    : null}
                </ul>
            </section>
        </SessionPage>
    )
}