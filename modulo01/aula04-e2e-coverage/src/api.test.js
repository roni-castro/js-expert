const { describe, it, before, after } = require('mocha');
const assert = require('assert');
const supertest = require('supertest');

describe('API Suite test', () => {
  let app;
  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });
  after((done) => {
    app.close(done);
  });

  describe('/contact:get', () => {
    it('should request the /contact route and return status 200', async () => {
      const response = await supertest(app).get('/contact');
      assert.equal(response.status, 200);
      assert.equal(response.text, "contact us page");
    });
  });

  describe('/login:post', () => {
    it('should request the /login route and return status 200', async () => {
      const response = await supertest(app).post('/login').send({
        username: 'roni',
        password: '123'
      });
      assert.equal(response.status, 200);
      assert.equal(response.text, "login success");
    });

    it('should request the /login route with invalid data and return status 401', async () => {
      const response = await supertest(app).post('/login').send({
        username: 'roni',
        password: 'invalidPass'
      });
      assert.equal(response.status, 401);
      assert.equal(response.text, "User credentials is invalid");
    });

    it('should request the /login route with missing data and return status 400', async () => {
      const response = await supertest(app).post('/login').send({});
      assert.equal(response.status, 400);
      assert.equal(response.text, "username and password are required");
    });
  });

  describe('/unknown:get', () => {
    it('should request the /unknown route and return status 404', async () => {
      const response = await supertest(app).get('/unknown');
      assert.equal(response.status, 404);
      assert.equal(response.text, 'Route not found');
    });
  });
});
