import { User, EmailsThatMatchPassword } from './types';
import { UserDTO, CredentialsDTO } from './dto';

export default class UserMapper {
  public static toUserDTO(user: User): UserDTO {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      guest: user.guest,
    };
  }

  public static toFriendsDTO(friends: User[]): UserDTO[] {
    return friends.map((friend) => {
      return this.toUserDTO(friend);
    });
  }

  public static toCheckPasswordWithEmailDTO(
    emailsThatMatchPassword: EmailsThatMatchPassword[]
  ): CredentialsDTO {
    const credentials = emailsThatMatchPassword.length
      ? {
          hasCorrectCredentials: true,
          id: emailsThatMatchPassword[0].id,
        }
      : {
          hasCorrectCredentials: false,
          id: null,
        };
    return credentials;
  }
}
