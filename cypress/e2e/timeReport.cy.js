import TimeReport from "../support/pageObjects/TimeReport";

describe("Project Time Report Testing", () => {
  it("Time reports", () => {
    cy.visit("/");
    cy.fixture("loginInfo").then((data) => {
      cy.login(data.username, data.password);
      cy.get(
        ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"
      ).should("have.text", data.expectedValidMsg);

      cy.get("aside[class='oxd-sidepanel'] li:nth-child(4)").click();
      cy.get(".oxd-topbar-header-breadcrumb-level").should(
        "contain",
        "Timesheets"
      );
    });
    cy.get('li[class*="topbar"]').contains("Reports").click();

    // cy.get(".oxd-dropdown-menu > :nth-child(1)").click();
    // cy.get(".oxd-autocomplete-text-input > input").type(
    //   "Apache Software Foundation"
    // );
    // cy.wait(2000);

    // cy.get('div[role="listbox"]')
    //   .find(".oxd-autocomplete-option")
    //   .each(($element, index, $list) => {
    //     if ($element.text().includes("Apache Software Foundation"))
    //       cy.wrap($element).click();
    //   });
    const timeReport = new TimeReport();
    timeReport.setProjectName("Apache Software Foundation");

    // cy.get(
    //   ":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-icon"
    // ).click();
    // cy.fixture("report").then((data) =>{
    //   cy.get('input[placeholder="From"]').type(data.fromDate);
    // })
    timeReport.setFromProjectDate();

    // cy.get(
    //   ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input"
    // );
    // cy.fixture("report").then((data) =>{
    // cy.get('input[placeholder="To"]').type(data.toDate);
    // })
    timeReport.setToProjectName();

    // cy.get('button[type="submit"]').click({ force: true });
    timeReport.clickViewButton();

    // cy.fixture("report").then((data) => {
    //   data.categories.forEach((category) => {
    //     const xpathExpression = `//div[normalize-space()="${category}"]`;

    //     if (category == "Support & Maintenance") {
    //       cy.log(`${category} is not listed, Maintenance spell mistake`);
    //       //Maintenance is typo as "Maintanence" on page
    //     } else {
    //       cy.xpath(xpathExpression).should("be.visible");
    //       cy.log(`${category} is listed`);
    //     }
    //   });
    // });
    timeReport.VerifyProjectTimeReport();
  });
});
