import supabase from '@/util/supabase';
import { v4 as uuid } from 'uuid';
import user from './UserManager';

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
            const { data, error } = await supabase.storage.from('listing_images')
                .upload(file_name_to_upload, file)

            if (error) throw error;

            paths.push(file_name_to_upload);
        }

        return paths;
    }

    static async deleteFiles(bucket_name: string, file_paths: string[]) {
        console.log('deleting files');
        const { error } = await supabase.storage.from(bucket_name).remove(file_paths);

        if (error) throw error;
    }

    static getPublicURLS(bucket_name: string, paths: string[]) {
        const urls: string[] = paths.map((path) => {
            const { data } = supabase.storage.from(bucket_name).getPublicUrl(path);
            return data.publicUrl;
        });

        return urls;
    }
}