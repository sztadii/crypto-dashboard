describe('main', () => {
  it('when a user visits / then he should see exchanges list', () => {
    cy.visit('/')

    cy.get('[data-testid="exchange-item"]').should('have.length', 10)
    cy.contains('Binance')
    cy.contains('Coinbase Exchange')
  })

  it('when a user visits /exchange-details/:id then he should see information about particular exchange', () => {
    cy.visit('/exchange-details/binance')
    cy.contains('Binance')
    cy.contains('Cayman Islands')
    cy.contains('2017')
  })
})
