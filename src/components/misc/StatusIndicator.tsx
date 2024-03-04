// Types
import { Status } from '@/types/Status'

type StatusIndicatorProps = {
    /**
     * Status to display
     */
    status: Status;
};

/**
 * Component that displays a green/red/gray circle depending on passed `status` prop's value
 */
export default function StatusIndicator({ status }: StatusIndicatorProps) {
    return (
        <div
            className='status'
            style={{
                backgroundColor: status == 'loading' ? 'gray' : status == 'success' ? 'green' : 'red'
            }} 
        />
    );
}
