// Classes
import ReverbManager from '@/classes/PlatformManager/ReverbManager'

export type PlatformID = 'reverb' | 'ebay'

export type Platforms = {
    reverb: ReverbManager
    ebay: ReverbManager
}