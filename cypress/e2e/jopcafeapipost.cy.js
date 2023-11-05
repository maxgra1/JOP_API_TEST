///<reference types = "cypress"/>
import { data } from '../fixtures/params.json'
describe('Get Jobs Test', () => {


    let positionBody = {
        "position": "QA",
        "company": "mycompan11",
        "location": "Toronto",
        "seniority": "junior",
        "link": "www.linkedin.com",
        "description": "some text",
        "time": "two hours ago",
        "salary": "100k",
        "date": "2010-06-06T12:00:00"
    }
    let id;
    let adminKey = 'adminadmin'
    it('Just Delete', () => {
        cy.deletePositionById(id)
    })
    it('get all jobs', () => {
        cy.request({
            method: 'POST',
            url: 'http://api.jobka.net:8081/jobs/create',
            body: positionBody,
            qs: { key: adminKey }
        }).then((response) => {
            console.log(response.body)
            id = response.body.id
            expect(response.status).equal(201)
            expect(response.body.company).equal('mycompan11')
            cy.deletePositionById(id)
        })
    })
    it('get all jobs Pictures', () => {
        data.forEach(element => {
            cy.request({
                method: 'POST',
                url: 'http://api.jobka.net:8081/jobs/create',
                body: element,
                qs: { key: adminKey }
            }).then((response) => {
                console.log(response.body)
                id = response.body.id
                expect(response.status).equal(201)
                expect(response.body.company).equal(element.company)
                expect(response.body.position).equal(element.position);
                    expect(response.body.location).equal(element.location);
                    expect(response.body.seniority).equal(element.seniority);
                    expect(response.body.link).equal(element.link);
                    expect(response.body.description).equal(element.description);
                    expect(response.body.time).equal(element.time);
                cy.deletePositionById(id)

            })
        })
    })
   // Я ПОПРОБЫВАЛ метод GET НО ПОЧЕМУ-ТО НЕ РАБОТАЕТ
    /* //describe('Тest API Jobka', () => {
        const adminKey = 'adminadmin'; а

        data.forEach((element, index) => {
            it(`Check element ${index + 1}`, () => {
                cy.request({
                    method: 'GET', 
                    url: 'http://api.jobka.net:8081/jobs/',
                    qs: { key: adminKey }

                }).then((response) => {
                    console.log(response.body)
                    id = response.body.id
                    expect(response.status).to.eq(200); 
                    expect(response.body).to.not.be.null; 

                    
                    expect(response.body.company).equal(element.company);
                    expect(response.body.position).equal(element.position);
                    expect(response.body.location).equal(element.location);
                    expect(response.body.seniority).equal(element.seniority);
                    expect(response.body.link).equal(element.link);
                    expect(response.body.description).equal(element.description);
                    expect(response.body.time).equal(element.time);
                    cy.deletePositionById(id)
                  
                });
            });
        }); */
   // });

    afterEach(() => {
        cy.deletePositionById(id)
    })



})