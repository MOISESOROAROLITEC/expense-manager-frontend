import { gql } from "@apollo/client";

export const registerUserGraphQL = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $birthDay: String!
    $image: Upload
  ) {
    createUser(
      createUserInput: {
        name: $name
        email: $email
        password: $password
        birthDay: $birthDay
        image: $image
      }
    ) {
      token
    }
  }
`;

export const loginUserGraphQL = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(loginUserInput: { email: $email, password: $password }) {
      token
    }
  }
`;

export const getUserByTokenGraphQL = gql`
  query getUserByToken($token: String!) {
    getUserByToken(token: $token) {
      name
      email
      birthDay
      token
    }
  }
`;
