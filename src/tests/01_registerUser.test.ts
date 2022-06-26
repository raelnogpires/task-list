import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { CreateUserT, UserT } from '../@types/types/user.type';

import UserService from '../service/userService';

import User from '../database/models/User';

import { mockCompleteUser, mockInvalidEmailUser, mockUserRegister, mockWithoutEmailUser } from './mocks/user.mocks';

describe('01 - Tests user register endpoint. POST /user/register', () => {
  let userServiceStub: sinon.SinonStub;
  let userModelStub: sinon.SinonStub;

  describe('When user is registered with success', () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'registerUser')
        .resolves();
    });

    afterEach(() => {
      userServiceStub.restore();
    });

    it('returns status 201 and success message', async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockUserRegister as CreateUserT);

      expect(res.status).to.equal(201);
      expect(res.body).to.deep.equal({ message: 'User registered with success!' });
    });
  });

  describe('When user email is already registered in the application', () => {
    beforeEach(() => {
      userModelStub = sinon
        .stub(User, 'findOne')
        // @ts-ignore
        .resolves(mockCompleteUser as UserT);
    });

    afterEach(() => {
      userModelStub.restore();
    });

    it('returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockUserRegister);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: 'Email already registered' });
    });
  });

  describe(`When email isn't present at req.body or email's invalid`, () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'registerUser')
        .resolves();
    });

    afterEach(() => {
      userServiceStub.restore();
    });

    it(`email isn't present - returns status 400 and error message`, async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockWithoutEmailUser)

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"email" is required' });
    });

    it('invalid email - returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockInvalidEmailUser)

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"email" must be a valid email' });
    });
  });
});