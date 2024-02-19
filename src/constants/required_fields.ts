// Types
import { Listing } from '@/types/Listing';
import { PlatformID } from '@/types/Platform';

export const required_platform_fields: Record<PlatformID, (keyof Listing)[]> = {
    reverb: [ 'brand', 'model', 'title' ],
    ebay: []
}