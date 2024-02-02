import PlatformsContext from '@/state/PlatformsContext';
import { Listing, ListingPlatformStatus } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';
import { useContext } from 'react';

export default function usePlatforms() {
    const context = useContext(PlatformsContext);

    return {
        /**
         * Platforms
         */
        platforms: context.platforms,
        /**
         * Get status of listing for specified platform
         * @param listing Listing to check
         * @param platform_id Id of platform to check
         * 
         * @returns ListingPlatformStatus
         */
        getListingStatus(listing: Listing, platform_id: PlatformID): ListingPlatformStatus {
            const key = platform_id + '_key' as keyof Listing;
            if(!listing[key]) {
                return 'not-uploaded'
            } else {
                return 'draft' // #TODO: implement checking logic
            }
        }
    }
}