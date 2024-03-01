// Types
import { Listing } from '@/types/Listing';
import { RequiredFields } from '@/types/Misc';
import { PlatformID } from '@/types/Platform';

export const required_platform_fields: RequiredFields = {
    reverb: {
        publish: [ 'brand', 'model', 'title' ],
        draft: []
    },
    ebay: {
        publish: [ 'sku' ],
        draft: [ 'sku' ]
    }
}