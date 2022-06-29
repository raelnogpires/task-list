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

import { mockTask, taskReturnMock } from './mocks/task.mocks';

import TaskService from '../service/taskService';

import { TaskT } from '../@types/types/task.type';
import UserService from '../service/userService';

describe('03 - Tests task creation endpoint. POST /task', () => {
  let taskServiceStub: sinon.SinonStub;
  let userServiceStub: sinon.SinonStub;

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

    const token = generateToken(mockCompleteUser.email);

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
});