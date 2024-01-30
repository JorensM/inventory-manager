import { ComponentProps } from 'react';

type TextInputProps = {
    label: string
} & ComponentProps<'input'>;

export default function TextInput( { label, ...props }: TextInputProps) {
    return (
        <div className='input-container'>
            <label>{label}</label>
            <input type='text' {...props}></input>
        </div>
    )
}