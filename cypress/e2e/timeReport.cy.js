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

    const timeReport = new TimeReport();
    timeReport.setProjectName("Apache Software Foundation");

    timeReport.setFromProjectDate();

    timeReport.setToProjectDate();

    timeReport.clickViewButton();

    timeReport.VerifyProjectTimeReport();
  });

  after(()=>{
    cy.logoutOrangeHRM();
  });

});
