import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { describe } from 'mocha';

import Task from '../database/models/Task';

import { mockCompleteUser } from './mocks/user.mocks';

import { generateToken } from '../auth';
import { mockTaskWithoutStatus, mockTaskWithoutTitle } from './mocks/task.mocks';

describe('05 - Tests updating a created task. PUT /task', () => {
  let taskModelStub: sinon.SinonStub;

  const token = generateToken(mockCompleteUser.email);

  describe(`When the task's updated with success`, () => {
    beforeEach(() => {
      taskModelStub = sinon
        .stub(Task, 'update')
        .resolves([1]);
    });

    afterEach(() => {
      taskModelStub.restore();
    });

    it('returns status 200 and success message', async () => {
      const res = await chai
        .request(app)
        .put('/task/1')
        .set('authorization', token)
        .send({ title: 'Task 1', status: 'done' });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Task updated with success');
    });
  });

  describe(`When the task doesn't exist`, () => {
    beforeEach(() => {
      taskModelStub = sinon
        .stub(Task, 'update')
        .resolves([0]);
    });

    afterEach(() => {
      taskModelStub.restore();
    });

    it('returns status 404 and error message', async () => {
      const res = await chai
        .request(app)
        .put('/task/1')
        .set('authorization', token)
        .send({ title: 'Task 1', status: 'done' });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Task not found');
    });
  });

  describe(`When title isn't present at req.body`, () => {
    it('returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/task')
        .set('authorization', token)
        .send(mockTaskWithoutTitle);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"title" is required' });
    });
  });

  describe(`When status isn't present at req.body`, () => {
    it('returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/task')
        .set('authorization', token)
        .send(mockTaskWithoutStatus);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"status" is required' });
    });
  });
});