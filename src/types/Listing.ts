// Types
import { PlatformID } from './Platform'

export type Listing = {
    id: number
    title: string
    user_id: string
    team_id: number
    brand: string,
    model: string,
    reverb_id?: number,
    ebay_id?: string,
    reverb_status?: 'published' | 'draft'
}

export type ListingUpdate = Omit<Partial<Listing>, 'id'> & {
    id: number
}

export type ReverbListing = {
    id: number,
    make: string,
    model: string,
    title: string,
    link: string,
    status: 'published' | 'draft'
}

export type ListingStatus = 'published' | 'draft'

export type PlatformListing = ReverbListing;

export type PlatformListings = Partial<Record<PlatformID, PlatformListing | null>>

export type APIKeyName = `${PlatformID}_key` //#TODO: This should be moved, probably to Platform.ts

export type PlatformIDKey = `${PlatformID}_id`

export type ListingPlatformStatus = 'draft' | 'not-uploaded' | 'published'