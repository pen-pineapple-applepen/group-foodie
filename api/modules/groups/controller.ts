import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { GroupsServiceImpl } from './service';

export interface GroupsController {
  getDueDateByGroupId(req: Request, res: Response, next: NextFunction): Promise<void>;
  createGroup(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@Service()
export class GroupsControllerImpl implements GroupsController {
  constructor(private readonly groupsService: GroupsServiceImpl) {}

  getDueDateByGroupId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { group_id } = req.params;
    try {
      const dueDate = await this.groupsService.getDueDateByGroupId(Number(group_id));
      res.status(200).send(dueDate);
    } catch (err) {
      next(err);
    }
  };

  createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { due_date } = req.body;
    try {
      const idAndDate = await this.groupsService.createGroup(due_date);
      res.status(200).send(idAndDate);
    } catch (err) {
      next(err);
    }
  };
}
