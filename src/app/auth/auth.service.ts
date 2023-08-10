import { AxiosResponse } from "axios";
import {
  UserResponse,
  UserRegisterResponse,
} from "../shared/interfaces/user-interfaces";
import { toastError, toastUnknowServerError } from "../shared/toast/toast";
import { ApolloError } from "@apollo/client";

export function showAuthResponseError(
  response: AxiosResponse<UserRegisterResponse | UserResponse, any>
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
    toastUnknowServerError();
  }
}

export function catchRequestError(error: any) {
  if (error instanceof ApolloError) {
    const errors = error.graphQLErrors[0].extensions as {
      originalError: { statusCode: number; message: string[] };
    };
    if (errors.originalError) {
      if (errors.originalError.statusCode === 400) {
        errors.originalError.message.forEach((errorMessage) => {
          toastError(errorMessage);
        });
      } else {
        toastUnknowServerError();
      }
    } else {
      toastError(error.message);
    }
  } else {
    toastUnknowServerError();
  }
}
