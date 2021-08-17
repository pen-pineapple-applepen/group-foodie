import knex, { Knex } from 'knex';
import mockDb, { Tracker } from 'mock-knex';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { UsersControllerImpl } from './controller';
import UserMapper from './mapper';
import { UsersServiceImpl } from './service';
import httpErrors from '../../errors/httpErrors';
import { User } from './types';
import ApiError from '../../errors/apiError';

const db = knex({
  client: 'postgresql',
});

const { res, next, clearMockRes } = getMockRes();

let usersService: UsersServiceImpl;
let usersController: UsersControllerImpl;

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
    // call methods, which should invoke mock methods
    await usersController.createUser(req, res, next);
    await usersController.getFriends(req, res, next);
    await usersController.getOneUser(req, res, next);
    await usersController.createFriend(req, res, next);
    await usersController.checkPasswordWithEmail(req, res, next);
    // assertions
    expect(getOneUserService).toBeCalled();
    expect(createUserService).toBeCalled();
    expect(getFriendsService).toBeCalled();
    expect(createFriendService).toBeCalled();
    expect(checkPasswordWithEmailService).toBeCalled();
  });
});

describe('getOneUser service', () => {
  let mockUserInfo: User;
  let tracker: Tracker;

  beforeEach((done) => {
    mockDb.mock(db);
    tracker = mockDb.getTracker();
    tracker.install();
    usersService = new UsersServiceImpl(db);
    done();
  });

  afterEach(() => {
    tracker.uninstall();
    mockDb.unmock(db);
  });

  test('missing user id should throw knex error', async () => {
    expect.assertions(2);

    try {
      await usersService.getOneUser();
      throw 'expected promise to reject, instead resolved';
    } catch (err) {
      expect(err.name).toBe('Error');
      expect(err.message).not.toBeNull();
    }
  });

  test('nonexistent user id should fail with 404', async () => {
    expect.assertions(2);
    const invalidUserId = 512341325;
    tracker.on('query', (query) => {
      query.response([null]);
    });
    try {
      await usersService.getOneUser(invalidUserId);
      throw 'expected promise to reject, instead resolved';
    } catch (err) {
      expect(err.httpError).toBe(httpErrors.NOT_FOUND);
      expect(err.message).toBe(`user with user ID ${invalidUserId} was not found`);
    }
  });

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
    tracker.on('query', (query) => {
      query.response([mockUserInfo]);
    });

    const validUserId = 1;
    const actual = await usersService.getOneUser(validUserId);
    expect(actual).not.toBeNull();
    expect(actual).toStrictEqual(mockUserInfo);
  });
});

describe('createUser service', () => {
  let mockUserInfo: User;
  let tracker: Tracker;

  beforeEach((done) => {
    mockDb.mock(db);
    tracker = mockDb.getTracker();
    tracker.install();
    usersService = new UsersServiceImpl(db);
    done();
  });

  afterEach(() => {
    tracker.uninstall();
    mockDb.unmock(db);
  });

  test('missing parameters should throw knex error', async () => {
    tracker.on('query', (query) => {
      query.response(null);
    });
    try {
      await usersService.createUser();
    } catch (err) {
      expect(err.name).toBe('Error');
      expect(err.message).not.toBeNull();
    }
  });

  test('knex not returning inserted id should throw 404 error', async () => {
    expect.assertions(2);
    const invalidUserId = 512341325;
    tracker.on('query', (query) => {
      query.response(null);
    });
    try {
      await usersService.createUser(invalidUserId);
      throw 'expected promise to reject, instead resolved';
    } catch (err) {
      expect(err.httpError).toBe(httpErrors.NOT_FOUND);
      expect(err.message).toBe(`error creating new user`);
    }
  });

  test('sucessful creation of user should return inserted user id', async () => {
    expect.assertions(2);
    const insertedId = 1;
    mockUserInfo = {
      first_name: 'charmander',
      last_name: 'smith',
      email: 'charcharbinks@pokemail.com',
      username: 'flameboy123',
      password: 'flaming-hot-cheeto',
      guest: false,
    };
    tracker.on('query', (query) => {
      query.response(insertedId);
    });
    const returnedId = await usersService.createUser(
      mockUserInfo.first_name,
      mockUserInfo.last_name,
      mockUserInfo.email,
      mockUserInfo.username,
      mockUserInfo.password || '',
      mockUserInfo.guest
    );
    expect(returnedId).not.toBeNull();
    expect(returnedId).toStrictEqual(insertedId);
  });
});

describe('getFriends service', () => {
  let tracker: Tracker;

  beforeEach((done) => {
    mockDb.mock(db);
    tracker = mockDb.getTracker();
    tracker.install();
    usersService = new UsersServiceImpl(db);
    done();
  });

  afterEach(() => {
    tracker.uninstall();
    mockDb.unmock(db);
  });

  test('missing parameters should throw knex error', async () => {
    tracker.on('query', (query) => {
      query.response([]);
    });
    try {
      await usersService.getFriends();
    } catch (err) {
      console.warn(err);
      expect(err.name).toBe('Error');
      expect(err.message).not.toBeNull();
    }
  });

  test('should call mapper after retrieving friends', async () => {
    expect.assertions(1);
    const userIdWithFriends = 512341325;
    const mockFriend = {
      id: 13,
      first_name: 'raichu',
      last_name: 'jones',
      email: 'lightningbolt@mail.com',
      username: 'thunderboy151',
      guest: false,
    };
    tracker.on('query', (query) => {
      query.response([mockFriend]);
    });
    const mapperSpy = jest.spyOn(UserMapper, 'toFriendsDTO');
    const friends = await usersService.getFriends(userIdWithFriends);
    expect(mapperSpy).toHaveBeenCalledWith(friends);
  });
});

describe('createFriend service', () => {
  let tracker: Tracker;

  beforeEach((done) => {
    mockDb.mock(db);
    tracker = mockDb.getTracker();
    tracker.install();
    usersService = new UsersServiceImpl(db);
    done();
  });

  afterEach(() => {
    tracker.uninstall();
    mockDb.unmock(db);
  });

  test('missing parameters should throw 404 error', async () => {
    expect.assertions(2);
    try {
      await usersService.createFriend();
      throw 'expected promise to reject, instead resolved';
    } catch (err) {
      expect(err.httpError).toBe(httpErrors.BAD_REQUEST);
      expect(err.message).toBe('user id and/or friend id are not defined');
    }
  });

  test('should send no response if successfully created', async () => {
    expect.assertions(1);
    tracker.on('query', (query) => {
      query.response('friend');
    });
    const shouldBeUndefined = await usersService.createFriend(1, 2);
    expect(shouldBeUndefined).toBeUndefined();
  });
});

describe('checkPasswordWithEmail service', () => {
  let tracker: Tracker;

  beforeEach((done) => {
    mockDb.mock(db);
    tracker = mockDb.getTracker();
    tracker.install();
    usersService = new UsersServiceImpl(db);
    done();
  });

  afterEach(() => {
    tracker.uninstall();
    mockDb.unmock(db);
  });

  test('missing parameters should throw 404 error', async () => {
    expect.assertions(2);
    try {
      await usersService.checkPasswordWithEmail();
      throw 'expected promise to reject, instead resolved';
    } catch (err) {
      expect(err.httpError).toBe(httpErrors.BAD_REQUEST);
      expect(err.message).toBe('email and/or password are not defined');
    }
  });

  test('should call mapper after retrieving friends', async () => {
    const mockEmailsThatMatchPassword = {
      id: 1,
      email: 'ash@pokemail.com',
    };
    tracker.on('query', (query) => {
      query.response([mockEmailsThatMatchPassword]);
    });
    const mapperSpy = jest.spyOn(UserMapper, 'toCheckPasswordWithEmailDTO');
    const loginDetails = await usersService.checkPasswordWithEmail(
      'pika@pokemail.com',
      'pikapassword123'
    );
    expect(mapperSpy).toHaveBeenCalledWith([mockEmailsThatMatchPassword]);
  });
});
