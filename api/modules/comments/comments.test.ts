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

  const mockRequest = (body?, params?, query?) => ({
    body,
    params,
    query,
  });

  const mockResponse = () => {
    const res = {} as any;
    res.status = function () {
      return this;
    };
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should call the appropriate service', async () => {
    const req = mockRequest({}, {}, { group_id: 1 });
    const res = mockResponse();
    const getCommentsService = jest.fn();
    commentsService.getComments = getCommentsService;
    await commentsController.getComments(req, res);
    expect(getCommentsService).toBeCalled();
  });

  it('should respond ', () => {});
});
