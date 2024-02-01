import { ComponentProps } from 'react';
import InputBase from './InputBase';
import { useField } from 'formik';

export type TextInputProps = {
    label: string
    name: string
} & ComponentProps<'input'>;

export default function TextInput( { label, required, ...props }: TextInputProps) {

    const [ field ] = useField(props.name);

    return (
        <InputBase
            label={label}
            required={required}
        >
            <input 
                type='text' 
                {...props}
                required={required}
                value={field.value}
                onChange={field.onChange(props.name)}
            >

            </input>
        </InputBase>
    );
}