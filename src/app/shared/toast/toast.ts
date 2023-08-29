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
  toast(message, {
    type: toast.TYPE.ERROR,
    className: "toast-error",
    bodyClassName: "toast-error-body",
  });
}

export function toastUnknowServerError() {
  toastError("Une erreur inconue s'est produite au niveau du serveur");
}

export function toastUnknowGlobalError() {
  toastError("Une erreur inconue s'est produite");
}

export function dismisToasts() {
  toast.dismiss();
}
