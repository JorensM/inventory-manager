// Types
import { RequiredFields } from '@/types/Misc';

/**
 * List of listing fields that are required to upload/publish on respective platforms
 */
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