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

describe('06 - Tests deleting a task. DELETE /task/:id', () => {
  let taskModelStub: sinon.SinonStub;

  const token = generateToken(mockCompleteUser.email);

  describe(`When the task's deleted with success`, () => {
    beforeEach(() => {
      taskModelStub = sinon
        .stub(Task, 'destroy')
        .resolves(1);
    });

    afterEach(() => {
      taskModelStub.restore();
    });

    it('returns status 200 and success message', async () => {
      const res = await chai
        .request(app)
        .delete('/task/1')
        .set('authorization', token);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Task deleted with success');
    });
  });

  describe(`When the task doesn't exist`, () => {
    beforeEach(() => {
      taskModelStub = sinon
        .stub(Task, 'destroy')
        .resolves(0);
    });

    afterEach(() => {
      taskModelStub.restore();
    });

    it('returns status 404 and error message', async () => {
      const res = await chai
        .request(app)
        .delete('/task/1')
        .set('authorization', token);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Task not found');
    });
  });

  describe(`When token's not provided`, () => {
    it('returns status 401 and error message', async () => {
      const res = await chai
        .request(app)
        .delete('/task/1');

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({ message: 'Token not found' });
    });
  });

  describe(`When token's invalid`, () => {
    it('returns status 401 and error message', async () => {
      const res = await chai
        .request(app)
        .delete('/task/1')
        .set('authorization', 'invalid token');

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({ message: 'Expired or invalid token' });
    });
  });
});