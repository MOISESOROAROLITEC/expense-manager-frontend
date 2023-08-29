/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     *
     * @example
     * cy.exemple({name:"username", email: "exemple@exemple.com"})
     */
    createUser({ name, email, password }: CreateUser): Chainable<any>;

    /**
     * login user and add token in localStarage
     * @example
     * cy.login("username@exemple.com", "azertyuiop")
     */
    login(email: string, password: string): Chainable<any>;

    /**
     *
     * @example
     * cy.deleteUserByEmail("username@exemple.com")
     */
    deleteUserByEmail(email: string): Chainable<any>;
  }
}
