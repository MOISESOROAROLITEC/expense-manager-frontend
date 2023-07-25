export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  birthDay: Date | number | string;
  token?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserRegisterResponse {
  data: {
    createUser: User;
  };
  errors: [
    { message: string; extensions: { originalError: { message: string[] } } }
  ];
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
