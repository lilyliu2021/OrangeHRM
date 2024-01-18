describe("Admin user testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.username, data.password);
      cy.get(
        ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"
      ).should("have.text", data.expectedValidMsg);

      cy.get("aside[class='oxd-sidepanel'] li:nth-child(1)").click();
      cy.get(".oxd-topbar-header-breadcrumb-level").should(
        "contain",
        "User Management"
      );
    });
  });

  it.skip("Add a new admin user", () => {
    cy.fixture("adminInfo").then((data) => {
      data.forEach((user) => {
        cy.log(user.employeeUserName);
        cy.log(user.employeeName);

        cy.deleteUser(user.employeeUsername);

        cy.xpath('//button[normalize-space()="Add"]').click();
        cy.selectOption("User Role", user.userRole);

        cy.selectOption("Status", user.status);

        cy.typeInField("Employee Name", user.employeeName);

        cy.wait(2000);

        cy.get('div[role="listbox"]')
          .find(".oxd-autocomplete-option")
          .each(($element, index, $list) => {
            if ($element.text().includes(user.employeeName))
              cy.wrap($element).click();
          });
        cy.typeInField("Password", user.employeePassword);
        cy.typeInField("Confirm Password", user.employeePassword);
        cy.get('button[type="submit"]').click();

        cy.scrollTo(0, 0);
        cy.typeInField("Username", user.employeeUsername);
        cy.get('button[type="submit"]').click({ force: true });
      });
    });
  });

  it("Verify the recently added user", () => {
    const userNameAdded = "Tester002";
    const userRoleAdded = "ESS";
    const userEmployeeNameAdded = "Alice Duval";
    const userStatusAdded = "Enabled";

    cy.scrollTo(0, 0);

    cy.fixture("adminInfo").then((data) => {
      cy.typeInField("Username", userNameAdded);
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.get('div.oxd-table-card > div[role="row"]').each(
      ($element, index, $list) => {
        const usernameInTable = $element.find("div").eq(3).text();
        const expectedUsername = userNameAdded;

        cy.log(usernameInTable);
        cy.get(".oxd-table-card > .oxd-table-row > :nth-child(2) > div").should(
          "contain",
          userNameAdded
        );
        cy.xpath(`//div[contains(text(),"${userRoleAdded}")]`).should(
          "be.visible"
        );
        cy.xpath(`//div[contains(text(),'${userEmployeeNameAdded}')]`).should(
          "be.visible"
        );
        cy.xpath(`//div[contains(text(),'${userStatusAdded}')]`).should(
          "be.visible"
        );

        cy.log("User is found!");
      }
    );
  });

  it("Clear up --Delete the added user", () => {
    const userNameToDelete = "Tester002";
    const userRoleToDelete = "ESS";
    const userEmployeeNameToDelete = "Alice Duval";
    const userStatusToDelete = "Enabled";

    cy.scrollTo(0, 0);

    cy.fixture("adminInfo").then((data) => {
      cy.typeInField("Username", userNameToDelete);
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.get('div.oxd-table-card > div[role="row"]').each(
      ($element, index, $list) => {
        const usernameInTable = $element.find("div").eq(3).text();
        const expectedUsername = userNameToDelete;

        cy.log(usernameInTable);
        cy.get(".oxd-table-card > .oxd-table-row > :nth-child(2) > div").should(
          "contain",
          userNameToDelete
        );
        cy.xpath(`//div[contains(text(),"${userRoleToDelete}")]`).should(
          "be.visible"
        );
        cy.xpath(
          `//div[contains(text(),'${userEmployeeNameToDelete}')]`
        ).should("be.visible");
        cy.xpath(`//div[contains(text(),'${userStatusToDelete}')]`).should(
          "be.visible"
        );

        cy.log("User is found!");

        cy.get('div[class="orangehrm-container"] button:nth-child(1)').click();
        cy.xpath('//button[normalize-space()="Yes, Delete"]').click();
        cy.log("User is deleted!");
      }
    );
  });
});
