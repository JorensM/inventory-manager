// Types
import { Category } from './Category'
import { PlatformID } from './Platform'
import { Image } from './File'

export type Listing = {
    id: number
    title: string
    user_id: string
    team_id: number
    brand: string,
    model: string,
    finish_color: string,
    country_of_manufacture: string,
    handedness: 'right_handed' | 'left_handed',
    body_type: string,
    string_configuration: string,
    fretboard_material: string,
    neck_material: string,
    condition: 'used' | 'non_functioning',
    category_id?: number | null,
    category?: Category,
    reverb_id?: number,
    ebay_id?: string,
    reverb_status?: 'published' | 'draft',
    ebay_status?: 'published' | 'draft'
    images: Image[]
}

export type ListingUpdate = Omit<Partial<Listing>, 'id'> & {
    id: number
}

export type ListingCreate = Omit<Listing, 'id'>;

export type ReverbListing = {
    id: number,
    make: string,
    model: string,
    title: string,
    link: string,
    status: 'published' | 'draft'
}

export type EbayListing = {
    id: number
}

export type ListingStatus = 'published' | 'draft'

export type PlatformListing = ReverbListing;

export type PlatformListings = Partial<Record<PlatformID, PlatformListing | null>>

export type APIKeyName = `${PlatformID}_key` //#TODO: This should be moved, probably to Platform.ts

export type PlatformIDKey = `${PlatformID}_id`

export type ListingPlatformStatus = 'draft' | 'not-uploaded' | 'published'