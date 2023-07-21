export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  birthDay: Date | number | string;
  token?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UserregisterResponse {
  data: {
    createUser: User;
  };
  errors: [{ message: string }];
}
export interface UserLoginResponse {
  data: {
    loginUser: User;
  };
  errors: [{ message: string }];
}
