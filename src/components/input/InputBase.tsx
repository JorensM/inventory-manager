// Core
import { PropsWithChildren } from 'react';

export type InputBaseProps = {
    /**
     * Label of field
     */
    label: string
    /**
     * Whether it is required. Will show a 'required' label if true
     */
    required?: boolean,
    /**
     * Direction of field contents
     */
    contentsDirection?: 'row' | 'column'
    /**
     * Alignment of field contents
     */
    contentsAlign?: 'center' | 'flex-start'
};

/**
 * Base input component with common styling
 */
export default function InputBase( { label, required = false, contentsDirection = 'row', contentsAlign = 'center', children }: PropsWithChildren<InputBaseProps>) {
    
    return (
        <div 
            className='input-container'
        >
            <label>{label}{required ? <span className='required'>(Required)</span> : null}</label>
            <div 
                className='contents'
                style={{
                    flexDirection: contentsDirection,
                    alignItems: contentsAlign
                }}
            >
                {children}
            </div>
            
        </div>
    );
}