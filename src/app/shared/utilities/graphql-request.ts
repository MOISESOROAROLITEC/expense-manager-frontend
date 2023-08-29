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
  query user($pageSize: Int!, $offset: Int!) {
    user {
      name
      email
      amount
      target
      birthDay
      token
      transactions(pageSize: $pageSize, offset: $offset) {
        totalCount
        transactions {
          id
          amount
          accountType
          transactionType
          subject
          date
          deletedAt
        }
      }
    }
  }
`;

export const getUserTransactionsGraphQL = gql`
  query user($pageSize: Int!, $offset: Int!) {
    user {
      transactions(pageSize: $pageSize, offset: $offset) {
        totalCount
        transactions {
          id
          amount
          accountType
          transactionType
          subject
          date
          deletedAt
        }
      }
    }
  }
`;

export const updateUserTarget = gql`
  mutation updateUserTarget($target: Int!) {
    updateUserTarget(target: $target) {
      target
    }
  }
`;

export const createTransactionGraphQL = gql`
  mutation createTransaction(
    $amount: Int!
    $accountType: Enumerator!
    $transactionType: Enumerator!
    $date: String!
    $subject: String
  ) {
    createTransaction(
      createTransactionInput: {
        amount: $amount
        accountType: $accountType
        transactionType: $transactionType
        date: $date
        subject: $subject
      }
    ) {
      id
      amount
      accountType
      transactionType
      date
      subject
    }
  }
`;

export const removeTransactionGraphQL = gql`
  mutation removeTransaction($id: Int!) {
    removeTransaction(transactionId: $id) {
      id
      amount
      accountType
      transactionType
      subject
      date
      deletedAt
    }
  }
`;

export const deleteUsersGraphQL = gql`
  mutation DeleteUsers {
    deleteUsers {
      count
    }
  }
`;
