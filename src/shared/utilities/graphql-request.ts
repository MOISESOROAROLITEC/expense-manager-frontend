import { User, LoginData } from "../user-interface/interface";

export const registerUserGraphQLRequest = (userData: User) => ({
  query: `
    mutation CreateUser($name: String!, $email: String!, $password: String!, $birthDay: String!) {
      createUser(createUserInput: {
        name: $name,
        email: $email,
        password: $password,
        birthDay: $birthDay
      }){
        name
      }
    }`,
  variables: {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    birthDay: userData.birthDay,
  },
});

export const loginUserGraphQLRequest = (userData: LoginData) => ({
  query: `
    mutation CreateUser($email: String!, $password: String!) {
      loginUser(loginUserInput: {
        email: $email,
        password: $password,
      }){
        name
        email
        birthDay
      }
    }`,
  variables: {
    email: userData.email,
    password: userData.password,
  },
});
