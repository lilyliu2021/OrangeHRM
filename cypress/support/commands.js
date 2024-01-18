// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login command
///<reference types="cypress"/>

import "cypress-xpath";

Cypress.Commands.add("login", (username, password) => {
  cy.get("input[placeholder='Username']").type(username);
  cy.get("input[placeholder='Password']").type(password);
  cy.get("button[type='submit']").click();
});

// Delete user in case it exists
Cypress.Commands.add("deleteUser", (username) => {
  cy.get("label")
    .contains("Username")
    .parent()
    .parent()
    .find("div")
    .eq(1)
    .type(username);

  // Click on Submit
  cy.get('button[type="submit"]').click({ force: true });

  cy.wait(1000);

  //Delete it in case exists
  cy.get("body").then(($body) => {
    if ($body.find('div.oxd-table-card > div[role="row"]').length > 0) {
      cy.get('div.oxd-table-card > div[role="row"]').each(
        ($element, index, $list) => {
          if ($element.find("div").eq(3).text().includes(username)) {
            cy.wrap($element).find("div i.bi-trash").parent().click();
            cy.get("div.orangehrm-modal-footer > button > i.bi-trash").click();
          }
        }
      );
    }
  });
});

Cypress.Commands.add("selectOption", (field, value) => {
  // Find the label associated with the field and click on the parent div
  cy.get("label").contains(field).parent().parent().find("div").eq(1).click();

  // Iterate through each option in the dropdown
  cy.get('div[role="listbox"] > div[role="option"]').each(($element) => {
    if ($element.text().includes(value)) {
      cy.wrap($element).click();
    }
  });
});

Cypress.Commands.add("typeInField", (field, value) => {
  cy.get("label")
    .contains(field)
    .parent()
    .parent()
    .find("div")
    .eq(1)
    .type(value);
});

Cypress.Commands.add("logoutOrangeHRM", () => {
  cy.get(".oxd-userdropdown-tab").click();
  cy.contains("[role=menuitem]", "Logout").click();
});
