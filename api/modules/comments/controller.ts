import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';
import { Service } from 'typedi';
import { CommentsServiceImpl } from './service';

export interface CommentsController {
  getComments(req: Request, res: Response, next: NextFunction): Promise<void>;
  createComment(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@Service()
export class CommentsControllerImpl implements CommentsController {
  constructor(private readonly commentsService: CommentsServiceImpl) {}

  getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const group_id = req.query.group_id || undefined;
    try {
      const comments = await this.commentsService.getComments(Number(group_id));
      res.status(200);
      res.send(comments);
    } catch (err) {
      next(err);
    }
  };

  createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id, text, date, group_id } = req.body;
    try {
      const insertedId = await this.commentsService.createComment(
        Number(user_id),
        text,
        date,
        group_id
      );
      res.status(200).send(insertedId);
    } catch (err) {
      next(err);
    }
  };
}
