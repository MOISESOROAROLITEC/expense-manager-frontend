import { createUser, deleteUserByEmail } from "support/e2e";

describe("Login user", () => {
  const user = {
    name: "COLOTCHOLOMAN MOÏSE",
    email: "soromoise@gmail.com",
    password: "azertyuiop",
  };
  beforeEach(function () {
    cy.clearLocalStorage("token");
    cy.visit("/");
  });

  afterEach(() => {
    deleteUserByEmail(user.email);
  });

  it("login user and redirect then in dashboard", function () {
    createUser({ ...user });
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get("button[type='submit']").click();
    cy.location("pathname").should("equal", "/dashboard");
  });

  it("Should notify that email or password is not correct", () => {
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get("button[type='submit']").click();
    cy.get(".Toastify").contains("L'email ou le mot de passe est incorrect");
    cy.location("pathname").should("eq", "/");
  });
});
