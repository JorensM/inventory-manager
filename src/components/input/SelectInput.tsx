// Core
import { ComponentProps, useMemo, ChangeEvent } from 'react';
import { useField } from 'formik';

// Components
import InputBase, { InputBaseProps } from './InputBase';

type SelectInputProps = InputBaseProps & ComponentProps<'select'> & {
    /**
     * Name of the input to be used in Formik
     */
    name: string,
    /**
     * Array of options with object with properties `label` and `value`
     */
    options: { label: string, value: string | number | undefined }[],
    /**
     * Array of strings of options to omit or a single string. Must be passed
     * value of option 
     */
    omitOptions?: string[] | string
}

/**
 * A select(dropdown) input
 */
export default function SelectInput( { label, options, omitOptions, onChange,  ...props }: SelectInputProps) {

    //-- Hooks --//
    const [ field ] = useField(props.name)

    //-- Memo --//

    /**
     * Convert omitOptions prop to an array if the prop is string or undefined
     */
    const _omitOptions: (string | undefined | number)[] = useMemo(() => {
        return typeof omitOptions == 'string' ? [ omitOptions ] : Array.isArray(omitOptions) ? omitOptions : []
    }, [omitOptions])

    //-- Handlers --//

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        field.onChange(props.name)(e);

        if(onChange) {
            onChange(e);
        }
    }

    return (
        <InputBase
            label={label}
        >
            <select
                onChange={handleChange}
                {...props}
                defaultValue={field.value}
            >
                {options.filter(option => !_omitOptions.includes(option.value)).map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </InputBase>
    );
}