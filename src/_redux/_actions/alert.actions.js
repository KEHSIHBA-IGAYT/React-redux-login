import { alertConstants } from '../_constants';

//toasts
import { toast } from "react-toastify";

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    });
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    });
    return { type: alertConstants.ERROR, message };
}

function clear() {
    toast.dismiss();
    return { type: alertConstants.CLEAR };
}