// Classes
import PlatformManager from '@/classes/PlatformManager/PlatformManager'

export type PlatformID = 'reverb' | 'ebay'

export type Platforms = Record<PlatformID, PlatformManager>