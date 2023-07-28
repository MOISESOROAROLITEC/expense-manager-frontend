import { AxiosResponse } from "axios";
import { GetUserByTokenResponse, UserRegisterResponse } from "../shared/user-interface/interface";
import { toastError, toastUnknowServerError } from "../shared/toast/toast";

export function showAuthResponseError(
  response: AxiosResponse<UserRegisterResponse | GetUserByTokenResponse, any>
) {
  try {
    if (response.data && response.data.message) {
      toastError(response.data.message);
    }
    if (response.data.errors) {
      response.data.errors.forEach((error) => {
        toastError(error.message);
        if (error.extensions.originalError) {
          error.extensions.originalError.message.map((el: string) =>
            toastError(el)
          );
        }
      });
    }
  } catch (error) {
    toastUnknowServerError()
  }
}
