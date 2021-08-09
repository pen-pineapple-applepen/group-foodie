import { CommentsControllerImpl } from './controller';
import { CommentsServiceImpl } from './service';
import db from '../../db';

let commentsService;
let commentsController: any;

beforeEach(() => {
  commentsService = new CommentsServiceImpl(db);
  commentsController = new CommentsControllerImpl(commentsService);
});

describe('comments controller', () => {
  const mockRequest = (body?, params?) => ({
    body,
    params,
  });

  const mockResponse = () => {
    const res = {} as any;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  }

  it('should call the appropriate service', () => {
    const req = mockRequest({}, { group_id: 1 });
    const res = mockResponse();
    jest.spyOn(commentsController, 'getCommentsByGroupId');
    jest.spyOn(commentsService, 'getCommentsByGroupId');

    commentsController.getCommentsByGroupId(mockRequest, mockResponse);
    expect(commentsService.getCommentsByGroupId).toHaveBeenCalledTimes(1);

  });

})
