export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  birthDay: Date | number | string;
}

export interface userDataResponse {
  data: {
    userData: {
      createUser: User;
    };
  };
  errors: [{ message: string }];
}
