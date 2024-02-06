import storage_keys from '@/constants/storage_keys';
import storage from '@/util/storage';

export default async function settingsPageLoader() {
    const settings = storage.get(storage_keys.settings)

    return {
        settings
    }
}