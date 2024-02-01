import PlatformManager from '@/classes/PlatformManager/PlatformManager';
import { createContext } from 'react';

const PlatformsContext = createContext<{
    platforms: PlatformManager[]
}>({
    platforms: []
})

export default PlatformsContext;