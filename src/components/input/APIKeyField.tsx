// Components
import TextInput, { TextInputProps } from '@/components/input/TextInput';
import StatusIndicator from '@/components/misc/StatusIndicator';

// Types
import { Status } from '@/types/Status';

type APIKeyFieldProps = TextInputProps & {
    status: Status | null;
};

/**
 * API Key Field. Allows you to input an API Key and also shows the ping status.
 */
export default function APIKeyField({ status, ...props }: APIKeyFieldProps) {
    return (
        <TextInput
            {...props} 
            right={status ? <StatusIndicator status={status} /> : null}
        />
    );
}
