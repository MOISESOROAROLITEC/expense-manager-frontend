import { User } from "../user-interface/interface";

export const registerUser = (userData: User) => ({
  query: `
    mutation CreateUser($name: String!, $email: String!, $password: String!, $birthDay: String!) {
      createUser(createUserInput: {
        name: $name,
        email: $email,
        password: $password,
        birthDay: $birthDay
      }){
        id
        name
        email
        birthDay
      }
    }`,
  variables: {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    birthDay: userData.birthDay,
  },
});
