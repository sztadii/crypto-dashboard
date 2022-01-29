describe('todo.spec.js', () => {
  it('when user visit home page then he should see exchange items', () => {
    cy.visit('/')
    cy.contains('Kraken').should('be.visible')
  })
})
