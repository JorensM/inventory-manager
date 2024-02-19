import BackButton from '@/components/buttons/BackButton';
import SessionPage from '@/components/layout/SessionPage';
import { useLoaderData } from 'react-router-dom';

export default function ReverbCategories() {

    const { categories } = useLoaderData() as { categories: { full_name: string, uuid: string }[] }

    return (
        <SessionPage>
            <section>
                <BackButton/>
                <h1>Reverb categories list</h1>
                <p>
                    This is the list of Reverb categories and their corresponding IDs.
                    This ID should be entered in the category edit/create page.
                </p>
                <table>
                <thead>
                    <tr>
                        <td>
                            Category name
                        </td>
                        <td>
                            Category ID
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr>
                            <td>
                                {category.full_name}
                            </td>
                            <td>
                                {category.uuid}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </section>
            
            
        </SessionPage>
    )
}