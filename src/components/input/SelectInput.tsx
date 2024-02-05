import { ComponentProps } from 'react';
import InputBase, { InputBaseProps } from './InputBase';
import { useField } from 'formik';

type SelectInputProps = InputBaseProps & ComponentProps<'select'> & {
    name: string,
    options: { label: string, value: string }[],
}

export default function SelectInput( { label, options, ...props }: SelectInputProps) {

    const [ field ] = useField(props.name)

    return (
        <InputBase
            label={label}
        >
            <select
                onChange={field.onChange(props.name)}
                {...props}
                defaultValue={field.value}
            >
                {options.map((option) => (
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