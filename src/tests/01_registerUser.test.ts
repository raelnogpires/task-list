import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { describe } from 'mocha';

import { CreateUserT, UserT } from '../@types/types/user.type';

import UserService from '../service/userService';

import User from '../database/models/User';

import {
  mockCompleteUser,
  mockInvalidEmailUser,
  mockInvalidPassword,
  mockInvalidUsername,
  mockUserRegister,
  mockWithoutEmailUser,
  mockWithoutPassword,
  mockWithoutUsername,
} from './mocks/user.mocks';

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

  describe(`When username isn't present at req.body or it's smaller than 4 characters`, () => {
    it(`username isn't present - returns status 400 and error message`, async () => {
      const res = await chai
      .request(app)
      .post('/user/register')
      .send(mockWithoutUsername);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"username" is required' });
    });

    it('invalid username - returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockInvalidUsername);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"username" length must be at least 4 characters long' });
    });
  });

  describe(`When password isn't present at req.body or it's smaller than 6 characters`, () => {
    it(`password isn't present - returns status 400 and error message`, async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockWithoutPassword);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"password" is required' });
    });

    it(`invalid passowrd - returns status 400 and error message`, async () => {
      const res = await chai
        .request(app)
        .post('/user/register')
        .send(mockInvalidPassword);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: '"password" length must be at least 6 characters long' });
    });
  });
});