import { ComponentProps, PropsWithChildren } from 'react';

export type InputBaseProps = {
    label: string
    required?: boolean
};

export default function InputBase( { label, required = false, children }: PropsWithChildren<InputBaseProps>) {
    return (
        <div className='input-container'>
            <label>{label}{required ? <span className='required'>(Required)</span> : null}</label>
            {children}
        </div>
    )
}