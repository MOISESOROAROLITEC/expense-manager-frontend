import { User } from "~/app/shared/interfaces/user-interfaces";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export type ResponseData = {
  data?: { loginUser: User };
  errors?: [{ message: string }];
};
