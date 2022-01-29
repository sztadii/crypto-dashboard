describe('todo.spec.js', () => {
  it('when a user clicks the single exchange from the home page then he can see the exchange details', () => {
    cy.visit('/')
    cy.get('[data-testid="exchange-item"]').first().click()
    cy.contains('Back to home').should('be.visible')
    cy.contains('Name:').should('be.visible').should('not.be.empty')
  })

  it('when a user visits the detail page and click "Back to home" then he will be redirected to the home page', () => {
    cy.visit('/')
    cy.get('[data-testid="exchange-item"]').first().click()
    cy.contains('Back to home').click()
    cy.get('[data-testid="exchange-item"]').first().should('not.be.empty')
  })
})
