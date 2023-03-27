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
    it('should request the contact route and return 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);
      assert.equal(response.text, 'contact us page');
    });
  });
});
