import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { UsersServiceImpl } from './service';

export interface UsersController {
  getOneUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getFriends(req: Request, res: Response, next: NextFunction): Promise<void>;
  createFriend(req: Request, res: Response, next: NextFunction): Promise<void>;
  checkPasswordWithEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@Service()
export class UsersControllerImpl implements UsersController {
  constructor(private readonly usersService: UsersServiceImpl) {}

  getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      const user = await this.usersService.getOneUser(Number(user_id));
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { first_name, last_name, email, username, password, guest } = req.body;
    try {
      const userId = await this.usersService.createUser(
        first_name,
        last_name,
        email,
        username,
        password,
        guest
      );
      res.status(200).send(userId);
    } catch (err) {
      next(err);
    }
  };

  getFriends = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = req.params;
    try {
      const friends = await this.usersService.getFriends(Number(user_id));
      res.status(200).send(friends);
    } catch (err) {
      next(err);
    }
  };

  createFriend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user_id } = req.params;
    const { friend_id } = req.body;
    try {
      await this.usersService.createFriend(Number(user_id), Number(friend_id));
      res.status(200).send('created friend');
    } catch (err) {
      next(err);
    }
  };

  checkPasswordWithEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.query;
    try {
      const credentials = await this.usersService.checkPasswordWithEmail(
        email as string,
        password as string
      );
      res.status(200).send(credentials);
    } catch (err) {
      next(err);
    }
  };
}
