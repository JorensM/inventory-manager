// Types
import { PlatformID } from './Platform';

export type Category = {
    id: number,
    name: string,
    team_id: number,
} & Partial<Record<PlatformID, string>>

export type CategoryCreate = Omit<Category, 'id' | 'team_id'>;

export type CategoryUpdate = Partial<Category> & {
    id: number
}