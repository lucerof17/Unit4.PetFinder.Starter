// index.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Assuming your index.js is in the project root directory

chai.use(chaiHttp);
const expect = chai.expect;

describe('API tests', () => {
    it('should return "Hello World!" at /api', (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Hello World!');
                done();
            });
    });

    it('should return an array of pets at /api/v1/pets', (done) => {
        chai.request(app)
            .get('/api/v1/pets')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    // Add more test cases for your other routes
});
