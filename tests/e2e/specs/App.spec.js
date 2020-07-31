describe('My App', () => {
  beforeEach(() => {
    cy.server({
      force404: true
    })
  })
  it('displays the correct title', () => {
    cy.route('**/api/v4/projects?archived=false&page=1', {})
    cy.visit('/')
    cy.get('cy|app-title').should('have.text', 'GitLab Environments Status')
  })
})
