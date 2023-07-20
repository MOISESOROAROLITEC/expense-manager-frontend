import { toast } from "react-toastify";

export function toastDefault(message: string, delay: number = 900) {
  toast(message, { delay });
}

export function toastSucces(message: string) {
  toast(message, { type: toast.TYPE.SUCCESS });
}

export function toastInfo(message: string) {
  toast(message, { type: toast.TYPE.INFO });
}

export function toastError(message: string) {
  toast(message, { type: toast.TYPE.ERROR });
}
