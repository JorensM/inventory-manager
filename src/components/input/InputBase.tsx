import { PropsWithChildren } from 'react';

export type InputBaseProps = {
    label: string
    required?: boolean,
    contentsDirection?: 'row' | 'column'
    contentsAlign?: 'center' | 'flex-start'
};

export default function InputBase( { label, required = false, contentsDirection = 'row', contentsAlign = 'center', children }: PropsWithChildren<InputBaseProps>) {

    // #TODO: Make it so that pressing enter moves focus to the next field instead
    // of submitting the form. More info: https://stackoverflow.com/a/70113306/1673694
    // const containerRef = useRef<HTMLDivElement>(null);
    // const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    //     if (event.code == 'Enter') {
    //         const form = containerRef.current!.closest('form');

    //         if(!form) throw new Error('Input field is not in a form');



    //     }
    // }
    
    return (
        <div 
            className='input-container'
            // onKeyDown={handleKeyDown}
            // ref={containerRef}
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