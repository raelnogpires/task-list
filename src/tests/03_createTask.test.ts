import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { describe } from 'mocha';

import { generateToken } from '../auth';

import { mockCompleteUser } from './mocks/user.mocks';

import TaskService from '../service/taskService';

import { TaskT } from '../@types/types/task.type';

import UserService from '../service/userService';

import {
  mockTask,
  mockTaskWithoutStatus,
  mockTaskWithoutTitle,
  taskReturnMock,
} from './mocks/task.mocks';

describe('03 - Tests task creation endpoint. POST /task', () => {
  let taskServiceStub: sinon.SinonStub;
  let userServiceStub: sinon.SinonStub;

  const token = generateToken(mockCompleteUser.email);

  describe('When task is created with success', () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'findUserByEmail')
        .resolves(mockCompleteUser);

      taskServiceStub = sinon
        .stub(TaskService.prototype, 'createTask')
        .resolves(taskReturnMock as TaskT);
    });

    afterEach(() => {
      userServiceStub.restore();
      taskServiceStub.restore();
    });

    it('returns status 201 and created task', async () => {
      const res = await chai
        .request(app)
        .post('/task')
        .set('authorization', token)
        .send(mockTask);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('status');
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
        .post('/task')
        .set('authorization', token)
        .set('userEmail', '')
        .send(mockTask);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });

  describe(`When token's not provided`, () => {
    it('returns status 401 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/task')
        .send(mockTask);

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({ message: 'Token not found' });
    });
  });

  describe(`When token's invalid`, () => {
    it('returns status 401 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/task')
        .set('authorization', 'invalid token')
        .send(mockTask);

      expect(res.status).to.equal(401);
      expect(res.body).to.deep.equal({ message: 'Expired or invalid token' });
    });
  });
});