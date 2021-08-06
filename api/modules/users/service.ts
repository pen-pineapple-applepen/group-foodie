import { Knex } from 'knex';
import { Service, Inject } from 'typedi';
// import db from '../../db';
import { User, Friend, Credentials } from './users.types';
import UserMap from './mapper';
import { UserDTO, FriendDTO, CheckCredentialsDTO } from './dto';

export interface IUsersService {
  getOneUserInfo(user_id: string): Promise<User>;
  createUser(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    guest: boolean
  ): Promise<number[]>;
  getFriends(user_id: number): Promise<Friend[]>;
  createFriend(user_id: number, friend_id: number): Promise<void>;
  checkPasswordWithEmail(email: string, password: string): Promise<Credentials>;
}

@Service()
export class UsersService implements IUsersService {
  constructor(
    @Inject('DATABASE_ACCESS')
    private db: Knex,
    private userMap: UserMap
  ) {}

  async getOneUserInfo(user_id: string): Promise<User> {
    const [user]: User[] = await this.db('users')
      .select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'guest')
      /* knex incompatibility with TS */
      .where({ id: user_id } as any);
    const userDTO = this.userMap.toUserDTO(user);
    return userDTO;
  }

  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    guest: boolean
  ): Promise<number[]> {
    const insertedId = await this.db('users').insert(
      {
        first_name,
        last_name,
        email,
        username,
        password,
        guest,
      },
      'id'
    );
    return insertedId;
  }

  async getFriends(user_id: number): Promise<Friend[]> {
    const friends = await this.db
      .select('users.id as id', 'first_name', 'last_name', 'username', 'email', 'password', 'guest')
      .from('users')
      .join('friends_join_table', function () {
        this.on('friends_join_table.friend_id', '=', 'users.id').andOn(
          'friends_join_table.user_id',
          '=',
          user_id.toString()
        );
      });
    return friends;
  }

  async createFriend(user_id: number, friend_id: number): Promise<void> {
    await this.db('friends_join_table').insert({
      user_id,
      friend_id,
    });
  }

  async checkPasswordWithEmail(email: string, password: string): Promise<any> {
    const emailsThatMatchPassword = await this.db
      .select('email', 'id')
      .from('users')
      .where({ email, password });

    if (emailsThatMatchPassword.length) {
      return {
        hasCorrectCredentials: true,
        id: emailsThatMatchPassword[0].id,
      };
    }
    console.log('error logging in');
    return {
      hasCorrectCredentials: false,
      id: null,
    };
  }
}
