const request = require('supertest');
// const app = require('../../server');
// const expect = require('expect.js');


describe('GET /api/cities/', function() {
  it('should areturn the queried City', function (done) {
    request(this.app)
      .get(`/api/cities/${'Chicago, IL'}`)
      .then((res) => {
        expect(res).toEqual({});
        done();
      })
      .catch(done.fail);
  });
});
