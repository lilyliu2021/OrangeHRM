describe("Admin testing", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.fixture("admin").then((data) => {
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
    it("Add a new user", () => {
      //Verify if the user already exists, if so delete it
    //   cy.fixture("admin").then((data) => {
    //     cy.deleteUser(data.employeeUsername[0]);
    //   });

      cy.get("button").contains("Add").click();

      cy.fixture("admin").then((data) => {
        cy.selectOption("User Role", data.userRole[0]);
      });

      cy.fixture("admin").then((data) => {
        cy.selectOption("Status", data.status[0]);
      });

      // Type the Employee Name and select in autocomplete
      cy.fixture("admin").then((data) => {
        cy.typeInField("Employee Name", data.employeeName[0]);

        cy.wait(2000);

        cy.get('div[role="listbox"]')
          .find(".oxd-autocomplete-option")
          .each(($element, index, $list) => {
            if ($element.text().includes(data.employeeName[0]))
              cy.wrap($element).click();
          });
      });

      cy.fixture("admin").then((data) => {
        cy.typeInField("Username", data.employeeUsername[0]);
      });

      cy.fixture("admin").then((data) => {
        cy.typeInField("Password", data.employeePassword);
      });

      cy.fixture("admin").then((data) => {
        cy.typeInField("Confirm Password", data.employeePassword);
      });

      cy.get('button[type="submit"]').click();

      cy.intercept(
        "/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC"
      ).as("users");
      cy.wait("@users");

      cy.scrollTo(0, 0);

      // Search the username
      cy.fixture("admin").then((data) => {
        cy.typeInField("Username", data.employeeUsername[0]);
      });

      cy.get('button[type="submit"]').click({ force: true });

      //Verify the recently added user

      cy.fixture("admin").then((data) => {
        cy.get('div.oxd-table-card > div[role="row"]').each(
          ($element, index, $list) => {
            expect($element.find("div").eq(3).text()).to.be.equal(
              data.employeeUsername
            );
          }
        );
      });
    });
  });

  it("Verify the recently added user", () => {
    cy.scrollTo(0, 0);
    // Type the username in order to search it
    cy.fixture("admin").then((data) => {
      cy.typeInField("Username", data.employeeUsername[0]);
    });

    // Click on Submit
    cy.get('button[type="submit"]').click({ force: true });

    cy.fixture("admin").then((data) => {
      cy.get('div.oxd-table-card > div[role="row"]').each(
        ($element, index, $list) => {
          const usernameInTable = $element.find("div").eq(3).text();
          const expectedUsername = data.employeeUsername[index];

          // Check if the usernames are equal
          if (usernameInTable !== expectedUsername) {
            // If not equal, navigate to the next page or perform other actions
            cy.get(".next-page-button").click(); // Replace with the selector or action to go to the next page
          }

          // Continue with the existing assertion
          expect(usernameInTable).to.be.equal(expectedUsername);
        }
      );
    });
  });

  it("clear up", () => {
    cy.wait(3000);
    cy.scrollTo(0, 0);
    // Type the username in order to search it
    cy.fixture("admin").then((data) => {
      cy.typeInField("Username", data.employeeUsername[0]);
    });

    // Click on Search
    cy.get('button[type="submit"]').click({ force: true });

    cy.fixture("admin").then((data) => {
      cy.get('div.oxd-table-card > div[role="row"]').each(
        ($element, index, $list) => {
          const usernameInTable = $element.find("div").eq(3).text();
          const expectedUsername = data.employeeUsername[index];

          // Check if the usernames are equal
          if (usernameInTable !== expectedUsername) {
            // If not equal, navigate to the next page or perform other actions
            cy.get(".next-page-button").click(); // Replace with the selector or action to go to the next page
          }

          // Continue with the existing assertion
          expect(usernameInTable).to.be.equal(expectedUsername);
          cy.get(".oxd-icon.bi-trash").click();
        }
      );
    });
  });
});
