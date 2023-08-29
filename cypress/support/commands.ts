/// <reference types="cypress" />

Cypress.Commands.add("loginUi", () => {
  cy.visit("/");
  cy.log("############## : befor");
  cy.log("############## : after");
  cy.get('input[name="email"]').type("soromoise4@gmail.com");
  cy.get('input[name="password"]').type("azertyuiop");
  cy.get("button[type='submit']").click();
  cy.url().should("include", "/dashboard");
});

declare global {
  namespace Cypress {
    interface Chainable {
      deleteUsers: () => void;
      loginUi: () => void;
    }
  }
}

export {};
