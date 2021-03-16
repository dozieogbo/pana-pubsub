import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import responses from '../../constants/responses';

chai.use(chaiHttp);

describe('PubSub Endpoints', () => {
  it('should subscribe on valid url', done => {
    const url = 'https://ene5kpboqtlul.x.pipedream.net/';

    chai
      .request(server)
      .post('/subscribe/nigeria')
      .send({
        url,
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.url).be.eql(url);

        done();
      });
  });

  it('should not subscribe on invalid url', done => {
    const url = '';

    chai
      .request(server)
      .post('/subscribe/nigeria')
      .send({
        url,
      })
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).be.an('object');
        expect(res.body.message).be.eql(responses.INVALID_SUBSCRIPTION_URL);

        done();
      });
  });

  it('should publish to subscribers', (done) => {
    chai
      .request(server)
      .post('/publish/nigeria')
      .send({
        title: 'Test publish',
      })
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).be.an('object');
        expect(res.body.message).be.eql(responses.PUBLISHED);

        done();
      });});
});
