///<reference types = "cypress"/>
describe('GET Endpoint Search Parameters Tests', () => {
  const baseUrl = 'http://api.jobka.net:8081/jobs';

  it('Should retrieve job by ID', () => {
    const testId = '65428d7c3f7d791f7b3e7b62'; 
    cy.request({
      method: 'GET',
      url: 'http://api.jobka.net:8081/jobs?id=65428d7c3f7d791f7b3e7b62'
    }).then((response) => {
      console.log(response.body)
      expect(response.status).to.eq(200);
      expect(response.body.content[0].id).to.eq(testId);
      cy.pause
    });
  });

   it('Should retrieve jobs by date', () => {
    const testDate = '2022-06-06';
    cy.request({
      method: 'GET',
      url: `${baseUrl}?date=2022-06-06`
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.content.forEach((job) => {
        expect(response.body.content[0].date).to.include('once upon a time');
      });
    });
  });

   it('Should retrieve jobs by company', () => {
    const testCompany = 'mycompany222';
    cy.request({
      method: 'GET',
      url: `${baseUrl}?company=${testCompany}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.content.forEach((job) => {
        expect(job.company).to.eq(testCompany);
      });
    });
  });

  it('Should retrieve jobs by location', () => {
    const testLocation = 'Toronto, ON, Canada';
    cy.request({
      method: 'GET',
      url: `${baseUrl}?location=${testLocation}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.content.forEach((job) => {
        expect(job.location).to.eq(testLocation);
      });
    });
  });

  it('Should retrieve jobs by description', () => {
    const testDescription = 'regional'; 
    cy.request({
      method: 'GET',
      url: `${baseUrl}?description=${testDescription}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.content.forEach((job) => {
        expect(job.description.toLowerCase()).to.include(testDescription);
      });
    });
  });
 
  it('Should retrieve jobs by combined parameters', () => {
    const combinedParams = '?location=Toronto&company=AppleOne';
    cy.request({
      method: 'GET',
      url: `${baseUrl}${combinedParams}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.content.forEach((job) => {
        expect(job.location).to.eq('Toronto, ON, Canada');
        expect(job.company).to.eq('AppleOne');
      });
    });
  });

  it('Should handle pagination correctly', () => {
    const paginationParams = '?location=Toronto&page=0&pageSize=10';
    cy.request({
      method: 'GET',
      url: `${baseUrl}${paginationParams}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.pageable).to.exist;
      expect(response.body.pageable.pageNumber).to.eq(0);
      expect(response.body.pageable.pageSize).to.eq(10);
    });
  });  
});
