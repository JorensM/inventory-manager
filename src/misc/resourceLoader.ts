// Core
import { LoaderFunctionArgs } from 'react-router-dom';

// Classes
import CategoryManager from '@/classes/CategoryManager';

// Util
import loaderInit from '@/util/loaderInit';
import platforms from '@/classes/PlatformManager/AllPlatforms';
import ListingManager from '@/classes/ListingManager';
import SettingsManager from '@/classes/SettingsManager';
import { PlatformListings } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';

type Resource = 'listings' | 'categories' | 'listing' | 'category' | 'platform_listings'

const SORT_ORDER: Record<Resource, number> = {
    'listing': 0,
    'categories': 1,
    'category': 2,
    'listings': 3,
    'platform_listings': 4
}

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

        
        // Sort resources so that dependant resources are fetched first
        resources = resources.sort((a, b) => {
            return SORT_ORDER[a] - SORT_ORDER[b]
        })

        console.log(resources);

        for(const resource of resources) {
            //@ts-expect-error we need to check if resource has the type property which it might
            const type: Resource = resource.type || resource;
            if(noops && noops.includes(type)) {
                continue;
            }
            switch (type) {
                case 'categories':
                    output.categories = await CategoryManager.fetchCategories();
                    break;
                case 'category': {
                    //const category_id = resources.includes('listing') ? output.listing.category_id : parseInt(params.category_id!);
                    output.category = await CategoryManager.fetchCategory(parseInt(params.category_id!));
                    break;
                }
                case 'listings':
                    throw new Error('Listings loader not implemented');
                    break;
                case 'listing': {
                    let category = undefined;
                    output.listing = await ListingManager.fetchListing(parseInt(params.listing_id!));
                    if(output.listing.category_id) {
                        category = CategoryManager.fetchCategory(output.listing.category_id);
                        output.listing.category = category;
                    }   
                    break;
                }
                case 'platform_listings': {
                    const platform_listings: PlatformListings = {};
                    const listing = output.listing
                    for(const platform_id in platforms.all()) {
                        const typed_platform_id = platform_id as PlatformID
                        const platform_listing_id: string = listing[platform_id + '_id'];
                        const api_key = await SettingsManager.getAPIKey(typed_platform_id)
                        if(platform_listing_id && api_key) {
                            platform_listings[typed_platform_id] = await platforms.get(typed_platform_id).getListing(listing);
                        }
                    }
                    output.platform_listings = platform_listings;
                    break;
                }
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