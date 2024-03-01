// Types
import { PlatformID } from './Platform'
import { Listing } from './Listing'

export type RequiredFields = Record<PlatformID, { publish: (keyof Listing)[], draft: (keyof Listing)[]}>