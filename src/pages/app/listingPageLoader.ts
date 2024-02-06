// Core
import { LoaderFunctionArgs } from 'react-router-dom';

// Classes
import ListingManager from '@/classes/ListingManager';
import platforms from '@/classes/PlatformManager/AllPlatforms';

// Types
import { PlatformListings } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';
import SettingsManager from '@/classes/SettingsManager';

/**
 * Listing Page loader
 * @returns Requested Listing object
 */
export default async function ( { params }: LoaderFunctionArgs ) {

    const platform_listings: PlatformListings = {};
    const listing = await ListingManager.fetchListing(parseInt(params.listing_id!));
    for(const platform_id in platforms.all()) {
        const typed_platform_id = platform_id as PlatformID
        const platform_listing_id: string = listing[platform_id + '_id'];
        if(platform_listing_id && SettingsManager.getAPIKey(typed_platform_id)) {
            console.log('getting listing')
            platform_listings[typed_platform_id] = await platforms.get(typed_platform_id).getListing(listing);
        }
    }
    return { listing, platform_listings };
}