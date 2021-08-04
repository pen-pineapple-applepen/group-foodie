import { UsersServiceImpl } from './service';
import db from '../../db';
import { CheckCredentialsDTO, FriendDTO, UserDTO } from './dto';
import { Request, Response } from 'express';

const usersService = new UsersServiceImpl(db);

interface IUsersController {
  getOneUser(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
  getFriends(req: Request, res: Response): Promise<void>;
  createFriend(req: Request, res: Response): Promise<void>;
  checkPasswordWithEmail(req: Request, res: Response): Promise<void>;
}

class UsersController implements IUsersController {
  async getOneUser(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const user = await usersService.getOneUserInfo(user_id);
      // map user object to DTO here
      res.status(200).send(user);
    } catch (err) {
      console.log('error getting one user: ', err);
      res.status(404).send(err);
    }
  }

  async createUser(req: Request, res: Response) {
    const { first_name, last_name, email, username, password, guest } = req.body;
    try {
      const userId = await usersService.createUser(
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
  }

  async getFriends(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const friends = await usersService.getFriends(Number(user_id));
      res.status(200).send(friends);
    } catch (err) {
      console.log('error getting friends: ', err);
      res.status(404).send(err);
    }
  }

  async createFriend(req: Request, res: Response) {
    const { user_id } = req.params;
    const { friend_id } = req.body;
    try {
      await usersService.createFriend(Number(user_id), Number(friend_id));
      res.status(200).send('created friend');
    } catch (err) {
      console.log('error creating friend: ', err);
      res.status(404).send(err);
    }
  }

  async checkPasswordWithEmail(req: Request, res: Response) {
    console.log('req.query:', req.query);
    const { email, password } = req.query;
    try {
      const passwordIsCorrect = await usersService.checkPasswordWithEmail(
        email as string,
        password as string
      );
      console.log('password checks out');
      res.status(200).send(passwordIsCorrect);
    } catch (err) {
      console.log('error getting restaurant: ', err);
      res.status(400).send(err);
    }
  }
}
