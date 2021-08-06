import { Service } from 'typedi';
import { User } from './users.types';
import { UserDTO } from './dto';

@Service()
export default class UserMap {
  public static toUserDTO(user: User): UserDTO {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      guest: user.guest,
    };
  }

  // public static toFriendDTO()
}

// export typeof UserMap;