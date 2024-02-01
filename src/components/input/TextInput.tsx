import { ComponentProps, ReactNode } from 'react';
import InputBase from './InputBase';
import { useField } from 'formik';

export type TextInputProps = {
    label: string
    name: string
    /**
     * Component to render on the right side of the input
     */
    right?: ReactNode
} & ComponentProps<'input'>;

export default function TextInput( { label, required, right, onChange, ...props }: TextInputProps) {

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
                onChange={(e) => {
                    field.onChange(props.name)(e);
                    if(onChange) {
                        onChange(e);
                    }
                }}
            >

            </input>
            {right ? right : null}
        </InputBase>
    );
}