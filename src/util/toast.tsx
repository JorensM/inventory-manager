import { closeSnackbar, enqueueSnackbar } from 'notistack';
import toast from 'react-hot-toast';

export function toastError(message: string) {
    enqueueSnackbar({
        message: <div dangerouslySetInnerHTML={{__html:message}} />,
        variant: 'error',
        autoHideDuration: 50 * 1000,
        className: 'snackbar',
        action: (snackbarID) => {
            return (
                <button onClick={() => closeSnackbar(snackbarID)}>
                    Dimiss
                </button>
            )
        } 
    })
}