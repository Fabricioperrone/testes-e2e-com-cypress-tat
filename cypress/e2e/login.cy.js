// cypress/support/commands.js

// ... Comando de signup aqui

Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/login')
  cy.get('#email').type(username)
  cy.get('#password').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes')
  cy.contains('h1', 'Your Notes').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(username, password)
  cy.session(username, login)
})
