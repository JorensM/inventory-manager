// Core
import { createContext } from 'react';

// Types
import ReverbManager from '@/classes/PlatformManager/ReverbManager';

// Platforms
import { Platforms } from '@/types/Platform';

// Util
import storage from '@/util/storage';



const PlatformsContext = createContext<{
    platforms: Platforms
}>({
    platforms: {
        reverb: new ReverbManager(null, true),
        ebay: new ReverbManager(null, true)
    }
})

export default PlatformsContext;