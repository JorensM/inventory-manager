// Core
import { Link, useLoaderData } from 'react-router-dom';

// Components
import SessionPage from '@/components/layout/SessionPage';

// Types
import { Category } from '@/types/Listing';

// Util
import CategoriesList from '@/components/lists/CategoriesList';

export default function CategoriesPage() {

    // const supabase = createClient();

    const { categories } = useLoaderData() as { categories: Category[]}

    // const [ listings, setListings ] = useState<Listing[]>([]);

    // const fetchListings = async () => {
    //     const { data: _listings, error } = await supabase
    //         .from('listings')
    //         .select();

    //     if (error) {
    //         throw error;
    //     }

    //     setListings(_listings);
    // }

    // useEffect(() => {
    //     fetchListings();
    // }, [])

    

    

    return (
        <SessionPage>
            <section>
                <Link to='/app/dashboard'>Back to dashboard</Link>
                <h1>Listings</h1>
                {categories.length ? 
                    <CategoriesList
                        categories={categories}
                    />
                :
                    <>
                        <p>You don&apos;t have any categories</p>
                        <Link to='/app/categories/edit'>Create category</Link>
                    </>
                }
                
            </section>
        </SessionPage>
    );
}