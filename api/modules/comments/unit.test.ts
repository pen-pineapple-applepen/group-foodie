import { getMockReq, getMockRes } from '@jest-mock/express';
import { CommentsControllerImpl } from './controller';
import { CommentsServiceImpl } from './service';
import CommentsMapper from './mapper';
// import db from '../../db';

const { res, next, clearMockRes } = getMockRes();

let commentsService: CommentsServiceImpl;
let commentsController: CommentsControllerImpl;
let db;

describe('comments controller', () => {
  beforeAll(() => {
    jest.mock('./service');
    commentsService = require('./service');
    commentsController = new CommentsControllerImpl(commentsService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    clearMockRes();
  });

  it('should call the appropriate service', async () => {
    const req = getMockReq();
    const getCommentsService = jest.fn();
    const createCommentService = jest.fn();
    commentsService.getComments = getCommentsService;
    commentsService.createComment = createCommentService;
    await commentsController.getComments(req, res);
    await commentsController.createComment(req, res);
    expect(getCommentsService).toBeCalled();
    expect(createCommentService).toBeCalled();
  });

  // this test isn't actually testing anything, need to fix
  it('should return error', async () => {
    expect.assertions(1);
    const req = getMockReq();
    const getError = new Error('controller error');
    const createCommentService = jest.fn().mockRejectedValue(getError);
    commentsController.createComment = createCommentService;
    await expect(commentsController.createComment(req, res)).rejects.toEqual(getError);
  });
});

describe('comments service', () => {
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
    commentsService = new CommentsServiceImpl(db);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    clearMockRes();
  });

  // this test isn't testing anything, need to fix
  it('should successfully return when called with valid parameters', async () => {
    const req = getMockReq({ query: { group_id: 1 } });
    const comments = {
      name: 'pikachu',
      message: 'pika pi?',
    };
    const getCommentsService = jest.fn().mockResolvedValue(comments);
    commentsService.getComments = getCommentsService;

    const returnValue = await commentsService.getComments(1);
    expect(getCommentsService).toBeCalled();
    expect(returnValue).toBe(comments);
  });

  // this test doesn't work. want to mock return value of Knex query, but unsure how to do so.
  it('should get comments', async () => {
    const mData = [
      {
        id: 3,
        user_id: 2,
        text: 'i hate blue oceans',
        date: '12/12/2020',
        group_id: 1,
      },
    ];
    db.where.mockResolvedValueOnce(mData);
    const actual = await commentsService.getComments();
    expect(actual).toBe(mData);
  });
});

describe('dto mapper', () => {
  it('returns DTO when given object with extra properties', () => {
    const commentWithExtraProps = {
      id: 1,
      user_id: 1,
      text: 'pika!',
      date: '12/20/1922',
      group_id: 1,
      extra_prop: 231,
      extra_prop2: 'this is not necessary',
    };
    const commentWithExtraProps2 = {
      id: 1,
      user_id: 1,
      text: 'bulba!',
      date: '12/20/1922',
      group_id: 1,
      extra_prop: 123,
      extra_prop2: 'this is also not necessary',
    };
    const commentsWithExtraProps = [commentWithExtraProps, commentWithExtraProps2];
    const DTOComment = {
      id: 1,
      user_id: 1,
      text: 'pika!',
      date: '12/20/1922',
      group_id: 1,
    };
    const DTOComment2 = {
      id: 1,
      user_id: 1,
      text: 'bulba!',
      date: '12/20/1922',
      group_id: 1,
    };
    const DTOComments = [DTOComment, DTOComment2];

    const actualComment = CommentsMapper.toCommentDTO(commentWithExtraProps);
    const actualComments = CommentsMapper.toCommentsDTO(commentsWithExtraProps);
    expect(actualComment).toEqual(DTOComment);
    expect(actualComments).toEqual(DTOComments);
  });
});
