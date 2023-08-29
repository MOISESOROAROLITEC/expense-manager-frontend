describe("Sign-up", () => {
  beforeEach(function () {
    localStorage.removeItem("token");
    cy.visit("/sign-up");
  });
  const user = {
    name: "COLOTCHOLOMAN MOÏSE",
    email: "soromoise@gmail.com",
    password: "azertyuiop",
  };
  afterEach(() => {
    cy.deleteUserByEmail(user.email);
  });

  it("sign-up user and redirect then in dashboard", function () {
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get("button[type='submit']").click();
    cy.location("pathname").should("contain", "/dashboard");
    cy.get(".userFirstName-block").contains(`${user.name.split(" ")[0]}`);
  });

  it("sould notify that user with this email exist yet", () => {
    cy.createUser({ ...user });
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get("button[type='submit']").click();
    cy.location("pathname").should("eq", "/sign-up");
    cy.get(".Toastify").contains(`L'email '${user.email}' est déjà utilisé`);
  });
});
