import { CreateUser, ResponseData } from "./types";
import { catchRequestError } from "./utilities";
/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

Cypress.Commands.add("login", login);
Cypress.Commands.add("createUser", createUser);
Cypress.Commands.add("deleteUserByEmail", deleteUserByEmail);

export function deleteUsers() {
  cy.exec(
    `curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' --data-binary '{"query":"mutation{ deleteUsers { count }}"}' --compressed`
  );
}

export function createUser({ name, email, password }: CreateUser) {
  const query = `mutation {
    createUser(createUserInput: {
      name: "${name}",
      email: "${email}",
      password: "${password}",
      birthDay: "2023-08-09T10:35:56Z"
    }) {
      id
      name
      email
      token
    }
  }`;
  const queryJSON = JSON.stringify({ query });
  const curlCommand = `curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '${queryJSON}' --compressed`;
  cy.exec(curlCommand).then((res) => {
    catchRequestError(res);
  });
}

export function login(email: string, password: string) {
  const query = `mutation {
    loginUser(loginUserInput: {
      email: "${email}",
      password: "${password}",
    }) {
      token
    }
  }`;

  const queryJSON = JSON.stringify({ query });
  const curlCommand = `curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '${queryJSON}' --compressed`;

  cy.exec(curlCommand).then((res) => {
    catchRequestError(res);
    const response: ResponseData = JSON.parse(res.stdout);
    const token = response.data?.loginUser?.token;
    if (token) {
      localStorage.setItem("token", token);
    }
  });
}

export function deleteUserByEmail(email: string) {
  const query = `mutation {
    deleteUserByEmail(email: "${email}") {
      id
      name
      email
    }
  }
  `;

  const queryJSON = JSON.stringify({ query });
  const curlCommand = `curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '${queryJSON}' --compressed`;
  cy.exec(curlCommand);
}
