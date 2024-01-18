class TimeReport {
  setProjectName(projectName) {
    cy.get(".oxd-dropdown-menu > :nth-child(1)").click();
    cy.get(".oxd-autocomplete-text-input > input").type(projectName);
    cy.wait(2000);

    cy.get('div[role="listbox"]')
      .find(".oxd-autocomplete-option")
      .each(($element, index, $list) => {
        if ($element.text().includes(projectName)) cy.wrap($element).click();
      });
  }

  setFromProjectDate() {
    cy.get(
      ":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon"
    ).click();
    cy.fixture("report").then((data) => {
      cy.get('input[placeholder="From"]').type(data.fromDate);
    });
  }

  setToProjectName() {
    cy.get(
      ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input"
    );
    cy.fixture("report").then((data) => {
      cy.get('input[placeholder="To"]').type(data.toDate);
    });
  }

  clickViewButton() {
    cy.get('button[type="submit"]').click({ force: true });
  }

  VerifyProjectTimeReport() {
    cy.fixture("report").then((data) => {
      data.categories.forEach((category) => {
        const xpathExpression = `//div[normalize-space()="${category}"]`;

        if (category == "Support & Maintenance") {
          cy.log(`${category} is not listed, Maintenance spell mistake`);
          //Maintenance is typo as "Maintanence" on page
        } else {
          cy.xpath(xpathExpression).should("be.visible");
          cy.log(`${category} is listed`);
        }
      });
    });
  }
}

export default TimeReport;
