import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import UserService from '../service/userService';

import * as encrypt from '../utils/encrypting';

import User from '../database/models/User';

import { mockCompleteUser, mockUserLogin } from './mocks/user.mocks';

describe('02 - Tests user login endpoint. POST /user/login', () => {
  let userServiceStub: sinon.SinonStub;
  let encryptStub: sinon.SinonStub;

  describe('When user logs in with success', () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(UserService.prototype, 'userLogin')
        .resolves();
    });

    afterEach(() => {
      userServiceStub.restore();
    });

    it('returns status 200 and token', async () => {
      const res = await chai
        .request(app)
        .post('/user/login')
        .send(mockUserLogin);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });

  describe(`When user isn't found at database`, () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(User, 'findOne')
        .resolves(null);
    });

    afterEach(() => {
      userServiceStub.restore();
    });

    it('returns status 404 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/user/login')
        .send(mockUserLogin);

      expect(res.status).to.equal(404);
      expect(res.body).to.deep.equal({ message: 'User not found' });
    });
  });

  describe(`When login password doesn't match database password`, () => {
    beforeEach(() => {
      userServiceStub = sinon
        .stub(User, 'findOne')
        // @ts-ignore
        .resolves(mockCompleteUser);

      encryptStub = sinon
        .stub(encrypt, 'comparePassword')
        .resolves(false);
    });

    afterEach(() => {
      userServiceStub.restore();
      encryptStub.restore();
    });

    it('returns status 400 and error message', async () => {
      const res = await chai
        .request(app)
        .post('/user/login')
        .send(mockUserLogin);

      expect(res.status).to.equal(400);
      expect(res.body).to.deep.equal({ message: 'Invalid credentials' });
    });
  });
});