const {describe, it, before, after} = require('mocha');
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
      const response = await supertest(app).get('/contact').expect(200);
      assert.equal(response.text, 'contact us page');
    });
  });

  describe('/login:post', () => {
    it('should request the /login route and return status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({username: 'roni', password: '123'})
        .expect(200);
      assert.equal(response.text, 'ok login');
    });
  });

  describe('/login:post', () => {
    it('should request the /login route with invalid data and return status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({username: 'invalid', password: '123'})
        .expect(401);
      assert.ok(response.unauthorized);
      assert.equal(response.text, 'User credentials is invalid');
    });
  });
});
