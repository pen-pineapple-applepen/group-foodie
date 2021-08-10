import { CommentsControllerImpl } from './controller';
import { CommentsServiceImpl } from './service';
import db from '../../db';

jest.mock('./service');

let commentsService: CommentsServiceImpl;
let commentsController: CommentsControllerImpl;

describe('comments controller', () => {
  beforeEach(() => {
    commentsService = new CommentsServiceImpl(db);
    commentsController = new CommentsControllerImpl(commentsService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const mockRequest = (body?, params?) => ({
    body,
    params,
  });

  const mockResponse = () => {
    const res = {} as any;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should call the appropriate service', () => {
    const req = mockRequest({}, { group_id: 1 });
    const res = mockResponse();

    const mockGetComments = jest.fn();
    commentsService.getComments = mockGetComments;

    commentsController.getComments(mockRequest, mockResponse);
    expect(mockGetComments).toHaveBeenCalledTimes(1);
  });

  it('should respond', () => {

  })
});
