class Candidate {
  // Locators
  firstNameInput = 'input[placeholder="First Name"]';
  lastNameInput = 'input[placeholder="Last Name"]';
  vacancyInput = "Vacancy";
  emailInput = '(//input[@placeholder="Type here"])[1]';
  contactNumberInput = "Contact Number";
  keywordsInput = "Keywords";
  notesInput = "Notes";
  resumeUploadInput = "Resume";
  saveButton = 'button[type="submit"]';

  // Methods to interact with elements
  setFirstName(firstName) {
    cy.get(this.firstNameInput).type(firstName);
  }

  setLastName(lastName) {
    cy.get(this.lastNameInput).type(lastName);
  }

  setVacancy() {
    const randomNumber = Math.floor(Math.random() * 7);
    cy.fixture("candidate").then((data) => {
      cy.selectOption(this.vacancyInput, data.vacancy[randomNumber]);
    });
  }

  setEmail(email) {
    cy.xpath('(//input[@placeholder="Type here"])[1]').type(email,{force: true});
  }

  setContactNumber() {
    const areaCode = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const firstPart = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const secondPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const contactNumber = `${areaCode}-${firstPart}-${secondPart}`;
    cy.typeInField(this.contactNumberInput, contactNumber);
  }

  setKeywords(keywords) {
    cy.typeInField(this.keywordsInput, keywords);
  }

  setNotes(notes) {
    cy.typeInField(this.notesInput.notes);
  }

  setResume(resume) {
    // Upload a resume - Assuming you want to set the file path for upload
    cy.fixture(userData.resumeFileName).then((fileContent) => {
      cy.get(this.resumeUploadInput).attachFile({
        fileContent: fileContent,
        fileName: userData.resumeFileName,
        mimeType: "application/pdf", // Adjust the MIME type accordingly
      });
    });
  }

  clickSaveButton() {
    cy.get(this.saveButton).click();
  }
}

export default Candidate;
