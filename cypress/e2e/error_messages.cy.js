///<reference types = "cypress"/>
const baseurl = 'http://api.jobka.net:8081/jobs/';
describe('DELETE Endpoint Negative Tests', () => {
  const baseUrl = 'http://api.jobka.net:8081/jobs/';
  const adminKey = 'adminadmin';

  it('Should not delete a job without an admin key', () => {
    const jobId = '65428ced3f7d791f7b3e7b44';
    cy.request({
      method: 'DELETE',
      url: baseUrl + jobId,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Bad Request');
    });
  });

  it('Should not delete a job with an invalid admin key', () => {
    const jobId = '65428ced3f7d791f7b3e7b44';
    cy.request({
      method: 'DELETE',
      url: baseUrl + jobId,
      qs: { key: 'invalid_key' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body.error).to.eq('Forbidden');
    });
  });

  it('Should not delete a job with an invalid job ID', () => {
    const invalidJobId = '123';
    cy.request({
      method: 'DELETE',
      url: baseUrl + invalidJobId,
      qs: { key: adminKey },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error).to.eq('Not Found');
    });
  })// тут я не понимаю почему я получаю статус 200
});
describe('POST Endpoint Negative Tests', () => {
  const baseUrl = 'http://api.jobka.net:8081/jobs/create';
  const adminKey = 'adminadmin';
  let positionBody = {
    "position": "QA",
    "company": "Mycompany",
    "location": "Toronto",
    "seniority": "junior",
    "link": "www.linkedin.com",
    "description": "some text",
    "time": "two hours ago",
    "salary": "100k",
    "date": "2000-06-06T12:00:00"
}
  it('Should not create a job posting without an admin key', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      body: positionBody,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Bad Request');
    });
  });

  it('Should not create a job posting with an invalid admin key', () => {
    cy.request({
      method: 'POST',
      url: baseUrl + '?key=invalid_key',
      body: positionBody,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(403);
      expect(response.body.error).to.eq('Forbidden');
    });
  });

  it('Should not create a duplicate job posting', () => {
    cy.request({
      method: 'POST',
      url: baseUrl + '?key=' + adminKey,
      body: positionBody,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.error).to.eq('Conflict');
    });
  });
});

