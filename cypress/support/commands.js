// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let adminKey = 'adminadmin'

Cypress.Commands.add('deletePositionById', (id) => {
    cy.request({
        method: 'DELETE',
        url: 'http://api.jobka.net:8081/jobs/' + id,
        qs: { key: adminKey }
    }).then((response) => {
        console.log(response)
    })

})
Cypress.Commands.add('Checkbyobject', (id,elemented,responsed) => {


    cy.request({
        method: 'POST',
        url: 'http://api.jobka.net:8081/jobs/create',
        body: element,
        qs: { key: adminKey }
    }).then((response) => {
        console.log(response.body)
        id = response.body.id
        expect(response.status).equal(201)
        expect(responsed).equal(elemented)
        cy.deletePositionById(id)

    })

})