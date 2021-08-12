import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import { Service } from 'typedi';
import { validationResult } from 'express-validator';
import { UsersServiceImpl } from './service';

interface UsersController {
  getOneUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
  getFriends(req: Request, res: Response): Promise<void>;
  createFriend(req: Request, res: Response): Promise<void>;
  checkPasswordWithEmail(req: Request, res: Response): Promise<void>;
}

@Service()
export default class UsersControllerImpl implements UsersController {
  constructor(private readonly usersService: UsersServiceImpl) {}

  getOneUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user_id } = req.params;
      const user = await this.usersService.getOneUserInfo(user_id);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
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
      console.log('error creating user: ', err);
      res.status(404).send(err);
    }
  };

  getFriends = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    try {
      const friends = await this.usersService.getFriends(Number(user_id));
      res.status(200).send(friends);
    } catch (err) {
      console.log('error getting friends: ', err);
      res.status(404).send(err);
    }
  };

  createFriend = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { friend_id } = req.body;
    try {
      await this.usersService.createFriend(Number(user_id), Number(friend_id));
      res.status(200).send('created friend');
    } catch (err) {
      console.log('error creating friend: ', err);
      res.status(404).send(err);
    }
  };

  checkPasswordWithEmail = async (req: Request, res: Response): Promise<void> => {
    console.log('req.query:', req.query);
    const { email, password } = req.query;
    try {
      const credentials = await this.usersService.checkPasswordWithEmail(
        email as string,
        password as string
      );
      res.status(200).send(credentials);
    } catch (err) {
      console.log('error getting restaurant: ', err);
      res.status(400).send(err);
    }
  };
}
