import { ListingPlatformStatus } from '@/types/Listing';

export const platform_name = {
    reverb: 'Reverb',
    ebay: 'eBay'
};

export const listing_platform_status: Record<ListingPlatformStatus, string> = {
    'draft': 'Draft',
    'not-uploaded': 'Not uploaded',
    'published': 'Published'
}