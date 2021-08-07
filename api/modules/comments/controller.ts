import { Request, Response } from 'express';
import { Service } from 'typedi';
import { CommentsServiceImpl } from './service';

export interface CommentsController {
  getCommentsByGroupId(req: Request, res: Response): Promise<void>;
  createComment(req: Request, res: Response): Promise<void>;
}

@Service()
export class CommentsControllerImpl implements CommentsController {
  constructor(private readonly commentsService: CommentsServiceImpl) {}

  getCommentsByGroupId = async (req: Request, res: Response): Promise<void> => {
    const { group_id } = req.params;
    try {
      const comments = await this.commentsService.getCommentsByGroupId(Number(group_id));
      res.status(200).send(comments);
    } catch (err) {
      res.status(404).send(err);
    }
  };

  createComment = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { text, date, group_id } = req.body;
    try {
      const insertedId = await this.commentsService.createComment(
        Number(user_id),
        text,
        date,
        group_id
      );
      res.status(200).send(insertedId);
    } catch (err) {
      console.log('failed making comment', err);
      res.status(400).send(err);
    }
  };
}
