import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Agent APIs', () => {
  let agent = {
    email: 'k@snabb.io',
    firstName: 'Mr',
    lastName: 'Potato',
    mobileNumber: '1234567890',
    transportType: 'car',
    transportDesc: 'Toyota',
    licensePlate: '123',
    color: 'white',
    teamId: '123'
  };

  describe('# POST /api/agents', () => {
    it('should create a new agent', (done) => {
      request(app)
        .post('/api/agents')
        .send(agent)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(agent.email);
          expect(res.body.firstName).to.equal(agent.firstName);
          expect(res.body.lastName).to.equal(agent.lastName);
          expect(res.body.mobileNumber).to.equal(agent.mobileNumber);
          agent = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/agents/:agentId', () => {
    it('should get agent details', (done) => {
      request(app)
        .get(`/api/agents/${agent._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(agent.email);
          expect(res.body.firstName).to.equal(agent.firstName);
          expect(res.body.lastName).to.equal(agent.lastName);
          expect(res.body.mobileNumber).to.equal(agent.mobileNumber);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when agent does not exists', (done) => {
      request(app)
        .get('/api/agents/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.code).to.exist;
          expect(res.body.key).to.exist;
          expect(res.body.message).to.exist;
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/agents/:agentId', () => {
    it('should update agent details', (done) => {
      agent.email = 'k1@snabb.io';

      request(app)
        .put(`/api/agents/${agent._id}`)
        .send(agent)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal('k1@snabb.io');
          expect(res.body.firstName).to.equal(agent.firstName);
          expect(res.body.lastName).to.equal(agent.lastName);
          expect(res.body.mobileNumber).to.equal(agent.mobileNumber);
          expect(res.body.transportType).to.equal(agent.transportType);
          expect(res.body.transportDesc).to.equal(agent.transportDesc);
          expect(res.body.licensePlate).to.equal(agent.licensePlate);
          expect(res.body.color).to.equal(agent.color);
          expect(res.body.teamId).to.equal(agent.teamId);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/agents/', () => {
    it('should get all agents', (done) => {
      request(app)
        .get('/api/agents')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all agents (with limit and skip)', (done) => {
      request(app)
        .get('/api/agents')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/agents/', () => {
    it('should delete agent', (done) => {
      request(app)
        .delete(`/api/agents/${agent._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal('k1@snabb.io');
          expect(res.body.firstName).to.equal(agent.firstName);
          expect(res.body.lastName).to.equal(agent.lastName);
          expect(res.body.mobileNumber).to.equal(agent.mobileNumber);
          done();
        })
        .catch(done);
    });
  });
});
