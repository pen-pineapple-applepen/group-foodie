import knex, { Knex } from 'knex';
import mockDb, { Tracker } from 'mock-knex';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { PaymentsControllerImpl } from './controller';
import PaymentsMapper from './mapper';
import { PaymentsServiceImpl } from './service';
import httpErrors from '../../errors/httpErrors';
import { Payment } from './types';
import ApiError from '../../errors/apiError';

const db = knex({
  client: 'postgresql',
});

const { res, next, clearMockRes } = getMockRes();

let paymentsService: PaymentsServiceImpl;
let paymentsController: PaymentsControllerImpl;

describe('payments controller', () => {
  beforeAll(() => {
    jest.mock('./service');
    paymentsService = require('./service');
    paymentsController = new PaymentsControllerImpl(paymentsService);
  });

  afterAll(() => jest.resetAllMocks());

  beforeEach(() => {
    clearMockRes();
  });

  it('should call the appropriate service', async () => {
    const req = getMockReq();
    // create mock service fns
    const getPaymentsService = jest.fn();
    const addPaymentService = jest.fn();

    // assign mock fns to mock service
    paymentsService.getPayments = getPaymentsService;
    paymentsService.addPayment = addPaymentService;
    // call methods, which should invoke mock methods
    await paymentsController.getPayments(req, res, next);
    await paymentsController.addPayment(req, res, next);
    // assertions
    expect(getPaymentsService).toBeCalled();
    expect(addPaymentService).toBeCalled();
  });
});
