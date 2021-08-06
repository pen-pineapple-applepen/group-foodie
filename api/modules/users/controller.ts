import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UsersServiceImpl, UsersService } from './service';
import db from '../../db';
import { CredentialsDTO, UserDTO } from './dto';

interface UsersController {
  getOneUser(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
  getFriends(req: Request, res: Response): Promise<void>;
  createFriend(req: Request, res: Response): Promise<void>;
  checkPasswordWithEmail(req: Request, res: Response): Promise<void>;
}

@Service()
export default class UsersControllerImpl implements UsersController {
  constructor(private readonly usersService: UsersService) {}

  getOneUser = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    try {
      const user = await this.usersService.getOneUserInfo(user_id);
      // map user object to DTO here
      res.status(200).send(user);
    } catch (err) {
      console.log('error getting one user: ', err);
      res.status(404).send(err);
    }
  }

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
  }

  getFriends = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    try {
      const friends = await this.usersService.getFriends(Number(user_id));
      res.status(200).send(friends);
    } catch (err) {
      console.log('error getting friends: ', err);
      res.status(404).send(err);
    }
  }

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
  }

  checkPasswordWithEmail = async (req: Request, res: Response): Promise<void> => {
    console.log('req.query:', req.query);
    const { email, password } = req.query;
    try {
      const passwordIsCorrect = await this.usersService.checkPasswordWithEmail(
        email as string,
        password as string
      );
      console.log('password checks out');
      res.status(200).send(passwordIsCorrect);
    } catch (err) {
      console.log('error getting restaurant: ', err);
      console.log('this is: ', this);
      res.status(400).send(err);
    }
  }
}
