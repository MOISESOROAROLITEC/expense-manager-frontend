import { faker } from "@faker-js/faker";

describe("Dashboard test", () => {
  const user = {
    name: faker.person.firstName("male"),
    email: faker.internet.email(),
    password: "azertyuiop",
  };
  beforeEach(() => {
    localStorage.removeItem("token");
    cy.createUser({ ...user });
    cy.login(user.email, user.password);
    cy.visit("/dashboard");
  });

  afterEach(() => {
    cy.deleteUserByEmail(user.email);
  });

  it("Should visite dashboard and verify that amount and target equal 0", () => {
    cy.location("pathname").should("equal", "/dashboard");
    cy.get("form.form-dialog-define-target")
      .should("be.visible")
      .get("button[type='reset']")
      .click();
    cy.get(".dashboard-content")
      .get(".saving")
      .get(".sold")
      .get(".amount")
      .contains("0");
    cy.get(".dashboard-content")
      .get(".saving")
      .get(".object")
      .get(".amount")
      .contains("0");
  });

  it("Should define target and verify that it's defined", () => {
    const target = 5000;
    const calculedTarget = (target * 6).toString();
    cy.get("form.form-dialog-define-target")
      .should("be.visible")
      .get("input[type='number'] ")
      .type(target.toString());
    cy.get("form.form-dialog-define-target")
      .get("button[type='submit'] ")
      .click();
    cy.get(".dashboard-content")
      .get(".saving")
      .get(".object")
      .get(".amount")
      .then(($amount) => {
        const amount = $amount.text();
        expect(Number(calculedTarget)).equal(
          parseFloat(amount.replace(/\s/g, ""))
        );
      });
  });
});
