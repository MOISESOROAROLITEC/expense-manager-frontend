import { User, LoginData } from "../user-interface/interface";

export const registerUserGraphQLRequest = (userData: User) => {
  return {
    query: `
    mutation CreateUser($name: String!, $email: String!, $password: String!, $birthDay: String!, $image: Upload) {
      createUser(createUserInput: {
        name: $name,
        email: $email,
        password: $password,
        birthDay: $birthDay,
        image: $image
      }){
        id
      }
    }`,
    variables: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      birthDay: userData.birthDay,
      image: userData.image,
    },
  };
};

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

export const getUserByTokenGraphQLRequest = (token: string) => {
  return {
    query: `
      query getUserByToken($token: String!){
        getUserByToken(token:$token){
          name
          email
          birthDay
        }
      }`,
    variables: {
      token
    }
  }
}