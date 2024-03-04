// Core
import { ComponentProps, ReactNode } from 'react';
import { useField } from 'formik';

// Components
import InputBase from './InputBase';

export type TextInputProps = {
    /**
     * Label of field
     */
    label: string
    /**
     * Name for Formik
     */
    name: string
    /**
     * Component to render on the right side of the input
     */
    right?: ReactNode
} & ComponentProps<'input'>;

/**
 * Text input component
 */
export default function TextInput( { label, required, right, onChange, ...props }: TextInputProps) {

    //-- Hooks --//
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