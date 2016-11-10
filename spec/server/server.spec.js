const request = require('supertest');
// const expect = require('expect.js');

xdescribe('/test', function() {
  it('should echo the request', function (done) {
    request(this.app)
      .get('/test')
      .then((res) => {
        expect(res.text).toEqual('hello');
        done();
      })
      .catch(done.fail);
  });
});
