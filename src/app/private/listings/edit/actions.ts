"use server"
import { createClient } from '@/util/supabase/server';
import { redirect } from 'next/navigation';

export async function submitNew(formData: FormData) {

    

    const data = {
        title: formData.get('title') as string,
    }

    const supabase = createClient();

    

    const { error } = await supabase.from('listings')
        .insert(data);

    if(error) {
        throw error
    }

    redirect("/private/dashboard");
}

export async function submitEdit() {

}