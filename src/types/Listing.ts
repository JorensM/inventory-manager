// Types
import { PlatformID } from './Platform'

export type Listing = {
    id: number
    title: string
    user_id: string
    team_id: number
    brand: string,
    model: string,
    reverb_id: number,
    ebay_id: string
}

export type ListingUpdate = Omit<Partial<Listing>, 'id'> & {
    id: number
}

export type ReverbListing = {
    id: number,
    make: string,
    model: string,
    title: string
}

export type APIKeyName = `${PlatformID}_key` //#TODO: This should be moved, probably to Platform.ts

export type PlatformIDKey = `${PlatformID}_id`

export type ListingPlatformStatus = 'draft' | 'not-uploaded' | 'published'