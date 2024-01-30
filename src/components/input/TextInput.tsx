import { ComponentProps } from 'react';
import InputBase from './InputBase';

type TextInputProps = {
    label: string
} & ComponentProps<'input'>;

export default function TextInput( { label, required, ...props }: TextInputProps) {
    return (
        <InputBase
            label={label}
            required={required}
        >
            <input 
                type='text' 
                {...props}
                required={required}
            >

            </input>
        </InputBase>
    )
}