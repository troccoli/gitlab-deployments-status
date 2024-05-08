describe('GitLab Environments Status', () => {
  it('displays the correct title', () => {
    cy.visit('/')
    cy.get('cy|app-title').should('have.text', 'GitLab Environments Status')
  })
})
