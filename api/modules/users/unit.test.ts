import { Knex } from 'knex';
import mockDb from 'mock-knex';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { UsersControllerImpl } from './controller';
import UserMapper from './mapper';
import { UsersServiceImpl } from './service';
import httpErrors from '../../errors/httpErrors';
import { User } from './types';

const db = knex({
  client: 'postgresql',
})

const { res, next, clearMockRes } = getMockRes();

let usersService: UsersServiceImpl;
let usersController: UsersControllerImpl;
let db;

describe('users controller', () => {
  beforeAll(() => {
    jest.mock('./service');
    usersService = require('./service');
    usersController = new UsersControllerImpl(usersService);
  });

  afterAll(() => jest.resetAllMocks());

  beforeEach(() => {
    clearMockRes();
  });

  it('should call the appropriate service', async () => {
    const req = getMockReq();
    // create mock service fns
    const getOneUserService = jest.fn();
    const createUserService = jest.fn();
    const getFriendsService = jest.fn();
    const createFriendService = jest.fn();
    const checkPasswordWithEmailService = jest.fn();
    // assign mock fns to mock service
    usersService.getOneUser = getOneUserService;
    usersService.createUser = createUserService;
    usersService.getFriends = getFriendsService;
    usersService.createFriend = createFriendService;
    usersService.checkPasswordWithEmail = checkPasswordWithEmailService;
    // call mock methods
    await usersController.createUser(req, res, next);
    await usersController.getFriends(req, res, next);
    await usersController.getOneUser(req, res, next);
    await usersController.createFriend(req, res, next);
    await usersController.checkPasswordWithEmail(req, res, next);

    expect(getOneUserService).toBeCalled();
    expect(createUserService).toBeCalled();
    expect(getFriendsService).toBeCalled();
    expect(createFriendService).toBeCalled();
    expect(checkPasswordWithEmailService).toBeCalled();
  });
});

describe('getOneUser service', () => {
  let mockUserInfo: User;
  beforeAll(() => {


    jest.mock('../../db', () => {
      const mKnex = {
        where: jest.fn().mockReturnThis(),
        raw: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        then: jest.fn().mockReturnThis(),
      };
      return jest.fn(() => mKnex);
    });
    db = require('../../db');

  });

  test('missing user id should fail with 404', async () => {
    expect.assertions(2);
    usersService = new UsersServiceImpl(db);
    try {
      await usersService.getOneUser();
      throw 'expected promise to reject, instead resolved';
    } catch (err) {
      expect(err.httpError).toBe(httpErrors.NOT_FOUND);
      expect(err.message).toBe('user id is undefined');
    }
  });

  // test('nonexistent user id should fail with 404', async () => {
  //   expect.assertions(1);
  //   const invalidUserId = 512341325;
  //   try {
  //     await usersService.getOneUser(invalidUserId);
  //     throw 'expected promise to reject, instead resolved';
  //   } catch (err) {
  //     expect(err.httpError).toBe(httpErrors.NOT_FOUND);
  //   }
  // });

  test('valid user id should return user info', async () => {
    expect.assertions(2);
    mockUserInfo = {
      id: 1,
      first_name: 'charmander',
      last_name: 'smith',
      email: 'charcharbinks@pokemail.com',
      username: 'flameboy123',
      guest: false,
    };
    db().where.mockResolvedValue(mockUserInfo);
    usersService = new UsersServiceImpl(db);

    const validUserId = 1;
    const actual = await usersService.getOneUser(validUserId);
    expect(actual).not.toBeNull();
    expect(actual).toStrictEqual(mockUserInfo);
  });
});
