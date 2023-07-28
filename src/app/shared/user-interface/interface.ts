export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  birthDay: Date | number | string;
  image?: string;
  token?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ErrorGraphQLRequestBaseInterface {
  message: string;
  errors: [
    { message: string; extensions: { originalError: { message: string[] } } }
  ];
}

export interface UserRegisterResponse extends ErrorGraphQLRequestBaseInterface {
  data: {
    createUser: User;
  };

}

export interface GetUserByTokenResponse extends ErrorGraphQLRequestBaseInterface {
  data: {
    getUserByToken: User;
  }
}

export interface UserRegisterError {
  response: {
    data: {
      errors: [
        {
          message: string;
          extentions: { originalError: { message: string[] } };
        }
      ];
    };
  };
}
export interface UserLoginResponse {
  data: {
    loginUser: User;
  };
  errors: [{ message: string }];
}
