// Core
import { LoaderFunctionArgs } from 'react-router-dom';

// Classes
import CategoryManager from '@/classes/CategoryManager';

// Util
import loaderInit from '@/util/loaderInit';
import platforms from '@/classes/PlatformManager/AllPlatforms';
import ListingManager from '@/classes/ListingManager';

type Resource = 'listings' | 'categories' | 'listing' | 'category'

/**
 * Resource loader that loads and returns specified resources. Used in React Router's loaders
 * @param resources Resources to load
 * @param noops These resources will be replaced by a 'null' value. Useful for 'create' pages
 * where the page asks for a resource but there is none to provide
 * @returns an object with respective resources
 */
export default function resourceLoader(resources: Resource[], noops: Resource[] = []) {
    return async ( { params }: LoaderFunctionArgs ) => {
        await loaderInit();

        const output: Partial<Record<Resource, any>> = {};

        for(const resource of resources) {
            //@ts-expect-error we need to check if resource has the type property which it might
            const type = resource.type || resource;
            if(noops && noops.includes(type)) {
                continue;
            }
            switch (type) {
                case 'categories':
                    output.categories = await CategoryManager.fetchCategories();
                    break;
                case 'category':
                    output.category = await CategoryManager.fetchCategory(parseInt(params.category_id!));
                    break;
                case 'listings':
                    throw new Error('Listings loader not implemented');
                    break;
                case 'listing':
                    output.listing = await ListingManager.fetchListing(parseInt(params.listing_id!));
                    break;
                default:
                    throw new Error('Unknown resource')
            }
        }

        for(const noop_resource_name of noops) {
            output[noop_resource_name] = null;
        }
        
        return output;
    }
}