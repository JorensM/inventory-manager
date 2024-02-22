import supabase from '@/util/supabase';
import { v4 as uuid } from 'uuid';
import user from './UserManager';
import { validateBucketName } from '@/constants/supabase';

export default class FilesManager {
    static async uploadFiles(files: File[]) {

        const team_id = user.getTeam()?.id;

        if(!team_id) {
            throw new Error("Cannot find user's team");
        }

        const paths: string[] = []

        for(const file of files) {
            const file_id = uuid();
            const file_ext = file.name.split('.').pop()
            const file_name_to_upload = team_id + "/" + file_id + "." + file_ext
            console.log(file_name_to_upload)
            const { error } = await supabase.storage.from('listing_images')
                .upload(file_name_to_upload, file)

            if (error) throw error;

            paths.push(file_name_to_upload);
        }

        return paths;
    }

    static async deleteFiles(bucket_name: string, file_paths: string[]) {
        const { error } = await supabase.storage.from(bucket_name).remove(file_paths);

        if (error) throw error;
    }

    static getPublicURLS(bucket_name: string, paths: (string | undefined)[] | undefined) {
        if(!paths) {
            return [];
        }
        // Validation
        if(!Array.isArray(paths)) {
            throw new Error('Paths must be an array')
        }
        validateBucketName(bucket_name);

        // Map paths to public URLs
        const urls: string[] = paths.filter(path => path != undefined).map((path) => {
            const { data } = supabase.storage.from(bucket_name).getPublicUrl(path!);
            return data.publicUrl;
        });

        // Return mapped URLs
        return urls;
    }
}