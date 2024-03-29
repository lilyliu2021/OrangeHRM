import { afterEach } from "mocha";

describe("Login in testing", () => {
  it("login with valid credentials", () => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.username, data.password);

      cy.get(
        ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"
      ).should("have.text", data.expectedValidMsg);
    });
  });

  it("login with valid username and invalid password", () => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.username, data.invalidPassword);

      cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
        "have.text",
        data.expectedInvalidMsg
      );
    });
  });

  it("login with invalid username and valid password", () => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.invalidUsername, data.password);

      cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
        "have.text",
        data.expectedInvalidMsg
      );
    });
  });

  it("login with invalid username and password", () => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.invalidUsername, data.invalidPassword);

      cy.get(".oxd-text.oxd-text--p.oxd-alert-content-text").should(
        "have.text",
        data.expectedInvalidMsg
      );
    });
  });

  afterEach(() => {
    cy.logoutOrangeHRM;
  });
});
