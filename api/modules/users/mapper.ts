import { Service } from 'typedi';
import { User, CheckCredentials } from './users.types';
import { UserDTO, CheckCredentialsDTO } from './dto';

export default class UserMapper {
  public static toUserDTO(user: User): UserDTO {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      guest: user.guest,
    };
  }

  public static toFriendsDTO(friends: User[]): UserDTO[] {
    return friends.map((friend) => {
      return this.toUserDTO(friend);
    });
  }

  // public static toCheckPasswordWithEmailDTO() {}
}

// export typeof UserMap;
