import { getMockReq, getMockRes } from '@jest-mock/express';
import { CommentsControllerImpl } from './controller';
import { CommentsServiceImpl } from './service';
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
    const req = getMockReq({ query: { group_id: 1 } });
    const getCommentsService = jest.fn();
    const createCommentService = jest.fn();
    commentsService.getComments = getCommentsService;
    commentsService.createComment = createCommentService;
    await commentsController.getComments(req, res);
    await commentsController.createComment(req, res);
    expect(getCommentsService).toBeCalled();
    expect(createCommentService).toBeCalled();
  });
});

describe('comments service', () => {
  beforeAll(() => {
    jest.mock('../../db');
    db = require('../../db');
    commentsService = new CommentsServiceImpl(db);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    clearMockRes();
  });

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
});
