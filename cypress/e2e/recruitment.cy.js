import { faker } from "@faker-js/faker";

describe("Recruitment testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.username, data.password);
      cy.get(
        ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"
      ).should("have.text", data.expectedValidMsg);

      cy.get("aside[class='oxd-sidepanel'] li:nth-child(5)").click();
    });
  });
  
  it("Add a candidate", () => {
    cy.get('li[class*="topbar"]').contains("Candidates").click();
    cy.xpath('//button[normalize-space()="Add"]').click();

    cy.get(".oxd-text.oxd-text--h6.orangehrm-main-title").should(
      "have.text",
      "Add Candidate"
    );

    cy.get('input[placeholder="First Name"]').type(faker.person.firstName());
    cy.get('input[placeholder="Last Name"]').type(faker.person.lastName());
    cy.selectOption("Vacancy", "Associate IT Manager");
    cy.xpath('(//input[@placeholder="Type here"])[1]').type(
      faker.internet.email()
    );
    cy.get('button[type="submit"]').click();
  });
});
