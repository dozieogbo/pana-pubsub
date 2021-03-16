import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';
import responses from '../../src/constants/responses';
import routes from '../../src/constants/routes';

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

  it('should publish to subscribers', done => {
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
      });
  });

  it('should return body of test 1', done => {
    let data = {
      title: 'Hello World'
    };

    chai
      .request(server)
      .post(routes.TEST_1)
      .send(data)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).be.an('object');
        expect(res.body).be.eql(data);

        done();
      });
  });

  it('should return body of test 2', done => {
    let data = {
      title: 'Hello World'
    };

    chai
      .request(server)
      .post(routes.TEST_2)
      .send(data)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).be.an('object');
        expect(res.body).be.eql(data);

        done();
      });
  });
});
