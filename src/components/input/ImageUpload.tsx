// Core
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useField } from 'formik'

// Types
import { Image } from '@/types/File';

// Components
import InputBase from './InputBase'

type ImageUploadProps = {
    /**
     * Label of the input
     */
    label: string,
    /**
     * Name for Formik
     */
    name: string,
    /**
     * Images that are already added to the resource
     */
    images?: Image[],
}

/**
 * Image Upload component. In Formik this submits the following object:
 * ```
 * { 
 *  add: file[], 
 *  remove: string[] 
 * }
 * ```
 * Where `add` are the files to be uploaded, and `remove` are the IDs of files to remove
 */
export default function ImageUpload( { name, label, images }: ImageUploadProps) {

    //-- Hooks --//
    const [ field ] = useField<{
        add: Image[],
        remove: string[]
    }>(name); 

    //-- State --//
    const [ newImages, setNewImages ] = useState<Image[]>([])
    const [ removedItems, setRemovedItems ] = useState<string[]>([]);

    //-- Memo --//
    const all_images: Image[] = useMemo(() => {
        return [
            ...(images ? images : []),
            ...newImages
        ]
    }, [images, newImages]);

    /**
     * On delete button click. If image was already uploaded before, then adds
     * the ID of the image to the `remove` array of the field value. If image hasn't
     * been uploaded yet, then simple removes the image from the `newImages` array.
     * @param id ID of the image. If undefined, then the next arg, `index`, is used.
     * @param index Index of the image in the `newImages` array
     */
    const onDeleteClick = (id: string | undefined, index?: number) => {
        console.log(id);
        console.log(index);
        if(typeof index === 'number') {
            console.log('removing image at index' + index);
            setNewImages(old_state => {
                const new_state = [...old_state];
                new_state.splice(index, 1);
                return new_state;
            })
        } else if (id) {
            field.value.remove.push(id);
            setRemovedItems((old_state) => {
                return [...old_state, id]
            })
        } else {
            throw new Error('Either id or index argument must be defined')
        }
    }

    /**
     * On file upload
     * @param e event
     */
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files![0]
        
        if(!file) {
            return;
        }
        setNewImages((old_state) => {
            const new_state = [...old_state];
            new_state.push({
                path: undefined,
                url: URL.createObjectURL(file),
                file: file
            })
            return new_state;
        })
    }

    //-- Effects --//

    useEffect(() => {
        field.value.add = newImages;
    }, [ newImages ])

    return (
        <InputBase
            label={label}
            contentsDirection='column'
            contentsAlign='flex-start'
        >
            <input type='file' onChange={onInputChange}/>
            {all_images.length ? 
                <div className='image-list'>
                    {all_images.filter(image => !removedItems.includes(image.path!)).map((image) => (
                        <div className='image-container'>
                            <button
                                type='button'
                                className='delete-button icon-button button-warn'
                                onClick={() => onDeleteClick(image.path, image.path ? undefined : newImages.indexOf(image))}
                            >
                                x
                            </button>
                            <img src={image.url} />
                        </div>
                    ))}
                </div>
            : null}
            
        </InputBase>
    );
}