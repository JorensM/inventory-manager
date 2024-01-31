import { ComponentProps } from 'react';
import InputBase, { InputBaseProps } from './InputBase';

type SelectInputProps = InputBaseProps & ComponentProps<'select'> & {
    options: { label: string, value: string }[],
}

export default function SelectInput( { label, options, ...props }: SelectInputProps) {
    return (
        <InputBase
            label={label}
        >
            <select
                {...props}
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