import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { beforeEach, describe } from 'mocha';

import TaskService from '../service/taskService';

import UserService from '../service/userService';

import { mockCompleteUser } from './mocks/user.mocks';

import { generateToken } from '../auth';

import { taskReturnMock } from './mocks/task.mocks';

describe('04 - Tests get all user tasks from DB. GET /task', () => {
  let taskServiceStub: sinon.SinonStub;
  let userServiceStub: sinon.SinonStub;

  const token = generateToken(mockCompleteUser.email);

  describe('When tasks are returned with success', () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'findUserByEmail')
        .resolves(mockCompleteUser);

      taskServiceStub = sinon
        .stub(TaskService.prototype, 'getUserTasks')
        // @ts-ignore
        .resolves([taskReturnMock]);
    });

    afterEach(() => {
      userServiceStub.restore();
      taskServiceStub.restore();
    });

    it('returns status 200 and users tasks', async () => {
      const res = await chai
        .request(app)
        .get('/task')
        .set('authorization', token);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('title');
      expect(res.body[0]).to.have.property('status');
      expect(res.body[0]).to.have.property('userId');
    });
  });

  describe('If something wrong happened at req.headers.userEmail', () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'findUserByEmail')
        .resolves(false);
    });

    afterEach(() => {
      userServiceStub.restore();
    });

    it('returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .get('/task')
        .set('authorization', token);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });
});