describe('Login in testing', () => {
  it('passes', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.title().should('eq','OrangeHRM')
  })
})