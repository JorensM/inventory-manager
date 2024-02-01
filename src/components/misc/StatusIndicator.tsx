import { Status } from '@/types/Status'

type StatusIndicatorProps = {
    status: Status;
};

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
