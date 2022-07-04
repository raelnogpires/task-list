import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;

import { describe } from 'mocha';

describe('07 - Tests auth middleware for JWT authentication', () => {
  
});