import { ComponentProps } from 'react';
import InputBase, { InputBaseProps } from './InputBase';

type SelectInputProps = InputBaseProps & ComponentProps<'select'> & {
    options: { label: string, value: string }[],
    default_value?: string
}

export default function SelectInput( { label, options, default_value, ...props }: SelectInputProps) {
    return (
        <InputBase
            label={label}
        >
            <select
                {...props}
            >
                {options.map((option) => (
                    <option
                        value={option.value}
                        selected={option.value == default_value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </InputBase>
    )
}