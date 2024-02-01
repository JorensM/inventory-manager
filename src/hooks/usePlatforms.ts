import PlatformsContext from '@/state/PlatformsContext';
import { useContext } from 'react';

export default function usePlatforms() {
    const context = useContext(PlatformsContext);

    return {
        /**
         * Platforms
         */
        platforms: context.platforms
    }
}