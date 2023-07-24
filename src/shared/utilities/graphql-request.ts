import { User, LoginData } from "../user-interface/interface";
import { gql } from "@apollo/client";

export const registerUserGraphQLRequest = (userData: User) => {
  return {
    query: `
    mutation CreateUser($name: String!, $email: String!, $password: String!, $birthDay: String!) {
      createUser(createUserInput: {
        name: $name,
        email: $email,
        password: $password,
        birthDay: $birthDay
      }){
        id
      }
    }`,
    variables: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      birthDay: userData.birthDay,
    },
  };
};

export const uploadUserImage = gql(`
  mutation CreateUser($image: Upload!, $userId: String!) {
    uploadUserImage(uploadUserImageInput: { image: $image, userId: $userId }) {
      status
    }
  }
`);

export const uploadUserImageGraphQLRequest = (image: File, userId: number) => ({
  query: `
  mutation CreateUser($image: Upload!, $userId: String!) {
    uploadUserImage(uploadUserImageInput:{
      image: $image,
      userId: $userId,
    }){
      status
    }
  }`,
  variables: {
    image: image,
    userId: userId,
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
