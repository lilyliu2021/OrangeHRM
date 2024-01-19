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

  setVacancy(vacancy,value) {
    cy.selectOption(this.vacancyInput, "Associate IT Manager");    
  }

  setEmail(email) {
    //cy.typeInField(email);
    cy.xpath('(//input[@placeholder="Type here"])[1]').type(email);
  }

  setContactNumber(contactNumber) {
    cy.typeInField(contactNumber);
  }

  setKeywords(keywords) {
    cy.typeInField(keywords);
  }

  setNotes(notes) {
    cy.typeInField(userData.notes);
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
