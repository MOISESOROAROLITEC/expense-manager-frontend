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

export function toastUnknowServerError() {
  toast("Une erreur inconue s'est produite au niveau du serveur", {
    type: toast.TYPE.ERROR,
  });
}

export function toastUnknowGlobalError() {
  toast("Une erreur inconue s'est produite", { type: toast.TYPE.ERROR });
}

export function dismisToasts() {
  toast.dismiss();
}
