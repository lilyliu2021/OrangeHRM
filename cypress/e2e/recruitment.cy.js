import { faker } from "@faker-js/faker";
import Candidate from "../support/pageObjects/addCandidate";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();

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

    // cy.get('input[placeholder="First Name"]').type(firstName);
    // cy.get('input[placeholder="Last Name"]').type(lastName);
    // cy.selectOption("Vacancy", "Associate IT Manager");
    // cy.xpath('(//input[@placeholder="Type here"])[1]').type(email);
    // cy.get('button[type="submit"]').click();
    const candidate = new Candidate();
    candidate.setFirstName(firstName);
    candidate.setLastName(lastName);
    candidate.setVacancy("Vacancy", "Associate IT Manager");
    candidate.setEmail(email);
    candidate.clickSaveButton();
  });

  it("Verify the added candidate", () => {
    cy.scrollTo(0, 0);
    cy.typeInField("Candidate Name", firstName);
    cy.wait(3000);

    cy.get('div[role="listbox"]')
      .find(".oxd-autocomplete-option")
      .each(($element, index, $list) => {
        if ($element.text().includes(firstName)) cy.wrap($element).click();
      });
    cy.get('button[type="submit"]').click({ force: true });

    cy.get('div.oxd-table-card > div[role="row"]').each(
      ($element, index, $list) => {
        const candidateInTable = $element.find("div").eq(3).text();
        const expectCandidate = firstName + "  " + lastName;
        cy.log(candidateInTable);
        cy.get(".oxd-table-card > .oxd-table-row > :nth-child(3) > div").should(
          "contain",
          firstName
        );

        cy.log("User is found!");
        cy.get(".oxd-icon.bi-eye-fill").click();
        cy.wait(3000);

        cy.xpath('(//p[@class="oxd-text oxd-text--p"])[1]').should(
          "have.text",
          expectCandidate
        );
      }
    );
  });

  it("Delete the added candidate", () => {
    cy.scrollTo(0, 0);
    cy.typeInField("Candidate Name", firstName);
    cy.wait(3000);

    cy.get('div[role="listbox"]')
      .find(".oxd-autocomplete-option")
      .each(($element, index, $list) => {
        if ($element.text().includes("Susie")) cy.wrap($element).click();
      });
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(3000);

    cy.get('div.oxd-table-card > div[role="row"]').each(
      ($element, index, $list) => {
        const candidateInTable = $element.find("div").eq(3).text();

        cy.log(candidateInTable);
        cy.get(".oxd-table-card > .oxd-table-row > :nth-child(3) > div").should(
          "contain",
          expectCandidate
        );

        cy.log("User is found!");
        // cy.get(
        //   '//*[@id="app"]/div[1]/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[3]/div/div[7]/div/button[2]'
        // ).click();
        cy.get(".oxd-icon.bi-eye-fill").parent().find(':nth-child(2)').click();
        
        cy.xpath('//button[normalize-space()="Yes, Delete"]').click();
        cy.log("User is deleted!");
      }
    );
  });
});
