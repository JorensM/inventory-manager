import TextInput, { TextInputProps } from '@/components/input/TextInput';
import StatusIndicator from '@/components/misc/StatusIndicator';

type APIKeyFieldProps = TextInputProps & {
    status: 'loading' | 'success' | 'fail';
};
export default function APIKeyField({ status, ...props }: APIKeyFieldProps) {
    return (
        <TextInput
            {...props} 
            right={<StatusIndicator status={status} />}
        />
    );
}
