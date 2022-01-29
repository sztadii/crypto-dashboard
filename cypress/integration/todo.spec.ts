describe('todo.spec.js', () => {
  it('when user visit home page then he can see a welcome message', () => {
    cy.visit('/')
    cy.contains('Learn React').should('be.visible')
  })
})
