// https://on.cypress.io/custom-commands
/// <reference types="cypress" />

Cypress.Commands.add("loginUi", () => {
  // Utilisez "context" au lieu de "describe" pour éviter les erreurs de contexte
  // et "it" pour les tests
  cy.visit("/");
  cy.log("############## : befor");
  cy.log("############## : after");

  // Utilisez des sélecteurs plus spécifiques pour les éléments de formulaire
  cy.get('input[name="email"]').type("soromoise4@gmail.com");
  cy.get('input[name="password"]').type("azertyuiop");
  cy.get("button[type='submit']").click();

  // Ajoutez des assertions pour vérifier que la redirection fonctionne correctement
  // Vous pouvez vérifier l'URL ou des éléments spécifiques sur la page de tableau de bord
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

// Cypress.Commands.add(
//   "loginUi",
//   ({ email, password }: { email: string; password: string }) => {
//     cy.session(
//       "user",
//       () => {
//         cy.visit("/login");
//         cy.get('input[name="email"]').type(email);
//         cy.get('input[name="password"]').type(password);
//         cy.get("button[type='submit']").click();
//         cy.location("pathname").should("equal", "/dashboard");
//       },
//       {
//         validate: () => {
//           cy.window().its("localStorage.token").should("exist");
//           cy.window().then((window) => {
//             const token = window.localStorage.getItem("token");
//             return token ? true : false;
//           });
//         },
//       }
//     );
//   }
// );
export {};
