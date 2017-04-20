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

describe('## Task APIs', () => {
  let task = {
    comments: 'This is a comment',
    type: 'pickup',
  };

  describe('# POST /api/tasks', () => {
    it('should create a new task', (done) => {
      request(app)
        .post('/api/tasks')
        .send(task)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.comments).to.equal(task.comments);
          expect(res.body.type).to.equal(task.type);
          task = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/tasks/:taskId', () => {
    it('should get task details', (done) => {
      request(app)
        .get(`/api/tasks/${task._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.comments).to.equal(task.comments);
          expect(res.body.type).to.equal(task.type);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when task does not exists', (done) => {
      request(app)
        .get('/api/tasks/56c787ccc67fc16ccc1a5e92')
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

  describe('# PUT /api/tasks/:taskId', () => {
    it('should update task details', (done) => {
      task.comments = 'This is an update';
      task.type = 'dropoff';
      request(app)
        .put(`/api/tasks/${task._id}`)
        .send(task)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.comments).to.equal('This is an update');
          expect(res.body.type).to.equal('dropoff');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/tasks/', () => {
    it('should get all tasks', (done) => {
      request(app)
        .get('/api/tasks')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all tasks (with limit and skip)', (done) => {
      request(app)
        .get('/api/tasks')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/tasks/', () => {
    it('should delete task', (done) => {
      request(app)
        .delete(`/api/tasks/${task._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });
});
