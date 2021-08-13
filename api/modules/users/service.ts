import { Knex } from 'knex';
import { Service, Inject } from 'typedi';
import { User, EmailsThatMatchPassword } from './types';
import UserMapper from './mapper';
import { UserDTO, CredentialsDTO } from './dto';
import ApiError from '../../errors/apiError';
import httpErrors from '../../errors/httpErrors';

export interface UsersService {
  getOneUser(user_id: number): Promise<UserDTO>;
  createUser(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string,
    guest: boolean
  ): Promise<number[]>;
  getFriends(user_id: number): Promise<UserDTO[]>;
  createFriend(user_id: number, friend_id: number): Promise<void>;
  checkPasswordWithEmail(email: string, password: string): Promise<CredentialsDTO>;
}

@Service()
export class UsersServiceImpl implements UsersService {
  constructor(
    @Inject('DATABASE_ACCESS')
    private db: Knex
  ) {}

  async getOneUser(user_id: number): Promise<UserDTO> {
    const userData: User[] = await this.db('users')
      .select('id', 'first_name', 'last_name', 'email', 'username', 'guest')
      // knex thinks there should be a string here, but this is correct knex syntax
      .where({ id: user_id } as any);

    if (!userData[0] || !userData.length) {
      throw new ApiError(`user with user ID ${user_id} was not found`, httpErrors.NOT_FOUND);
    }
    const user = userData[0];
    const userDTO = UserMapper.toUserDTO(user);
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
    if (!insertedId) {
      throw new ApiError('error creating new user', httpErrors.NOT_FOUND);
    }
    return insertedId;
  }

  async getFriends(user_id: number): Promise<UserDTO[]> {
    const friends: User[] = await this.db
      .select('users.id as id', 'first_name', 'last_name', 'username', 'email', 'guest')
      .from('users')
      .join('friends_join_table', function () {
        this.on('friends_join_table.friend_id', '=', 'users.id').andOn(
          'friends_join_table.user_id',
          '=',
          /**
           * knex expects strings as "variables", so when inserting an actual variable
           * that evaluates to anything else (in this case number), it throws a type error.
           * could potentially change type definitions in d.ts, but cast as any is a
           * simpler one-off solution in this case
           */
          user_id as any
        );
      });
    const friendsDTO = UserMapper.toFriendsDTO(friends);
    return friendsDTO;
  }

  async createFriend(user_id: number, friend_id: number): Promise<void> {
    await this.db('friends_join_table').insert({
      user_id,
      friend_id,
    });
  }

  async checkPasswordWithEmail(email: string, password: string): Promise<CredentialsDTO> {
    const emailsThatMatchPassword: EmailsThatMatchPassword[] = await this.db
      .select('email', 'id')
      .from('users')
      .where({ email, password });

    const loginDetails = UserMapper.toCheckPasswordWithEmailDTO(emailsThatMatchPassword);
    return loginDetails;
  }
}
