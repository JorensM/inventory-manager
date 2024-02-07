import CategoryManager from '@/classes/CategoryManager';
import { LoaderFunctionArgs } from 'react-router-dom';

type Resource = 'listings' | 'categories' | 'listing' | 'category'

export default function resourceLoader(resources: Resource[]) {
    return async ( { params }: LoaderFunctionArgs ) => {
        const output: any = {};

        for(const resource of resources) {
            //@ts-expect-error we need to check if resource has the type property which it might
            const type = resource.type || resource;
            switch (type) {
                case 'categories':
                    break;
                case 'category':
                    output.category = CategoryManager.fetchCategory(parseInt(params.category_id!))
                    break;
            }
        }

        return output;
    }
    
}