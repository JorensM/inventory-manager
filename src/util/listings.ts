// Types
import { Listing, ListingPlatformStatus } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';

export async function getListingStatus(listing: Listing, platform_id: PlatformID): Promise<ListingPlatformStatus> {
    const key = platform_id + '_id' as keyof Listing;
    if(!listing[key]) {
        return 'not-uploaded'
    } else {
        return 'draft' // #TODO: implement checking logic
    }
}