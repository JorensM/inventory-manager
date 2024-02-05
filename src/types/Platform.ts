// Classes
import PlatformManager from '@/classes/PlatformManager/PlatformManager'
import ReverbManager from '@/classes/PlatformManager/ReverbManager'

export type PlatformID = 'reverb' | 'ebay'

export type Platforms = {
    reverb: ReverbManager
    ebay: ReverbManager
}