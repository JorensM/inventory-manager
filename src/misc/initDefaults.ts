/**
 * This file initializes the defaults for the app, such as default settings.
 * This should be called as early as possible in the root file of the app
 */

// Constants
import { DEFAULT_SETTINGS } from '@/constants/defaults';
import storage_keys from '@/constants/storage_keys';

// Util
import storage from '@/util/storage';

// Set default settings if settings are not defined
const settings = storage.get(storage_keys.settings);
console.log(settings);
if(!settings) {
  storage.set(storage_keys.settings, DEFAULT_SETTINGS)
}