import { Knex } from 'knex';
import { Container, Service, Token } from 'typedi';
import db from '../../db';
import { User, Friend, Credentials } from './users.types';

// Container.set('DATA_ACCESS', db);

export interface UsersService {
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

// @Service()
export class UsersServiceImpl implements UsersService {
  // constructor(private readdb: Knex) {}

  // db: Knex = Container.get('DATA_ACCESS');

  async getOneUserInfo(user_id: string): Promise<User> {
    const user = await db('users')
      .select('id', 'first_name', 'last_name', 'email', 'username', 'password', 'guest')
      /* knex incompatibility with TS */
      .where({ id: user_id } as any);
    return user[0];
  }

  async createUser(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    guest: boolean
  ): Promise<number[]> {
    const insertedId = await db('users').insert(
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

  async getFriends(user_id: number): Promise<any[]> {
    const friends = await db
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
    await db('friends_join_table').insert({
      user_id,
      friend_id,
    });
  }

  async checkPasswordWithEmail(email: string, password: string): Promise<any> {
    const emailsThatMatchPassword = await db
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
