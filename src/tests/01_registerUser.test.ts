import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { CreateUserT } from '../@types/types/user.type';

import UserService from '../service/userService';

import { mockUserRegister } from './mocks/user.mocks';

describe('01 - Tests user register endpoint. POST /user/register', () => {
  let userServiceStub: sinon.SinonStub;

  describe('When user is registered with success', () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'registerUser')
        .resolves();
    });

    afterEach(() => {
      userServiceStub.restore();
    });

    it('returns status 201 and json message', async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockUserRegister as CreateUserT);

      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal({ message: 'User registered with success!' });
    });
  });
});