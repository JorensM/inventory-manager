import TextInput, { TextInputProps } from '@/components/input/TextInput';
import StatusIndicator from '@/components/misc/StatusIndicator';

type APIKeyFieldProps = TextInputProps & {
    status: 'loading' | 'success' | 'fail' | null;
};

export default function APIKeyField({ status, ...props }: APIKeyFieldProps) {
    return (
        <TextInput
            {...props} 
            right={status ? <StatusIndicator status={status} /> : null}
        />
    );
}
