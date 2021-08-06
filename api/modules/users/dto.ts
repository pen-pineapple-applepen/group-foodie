export interface UserDTO {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  guest: boolean;
}

export interface CheckCredentialsDTO {
  hasCorrectCredentials: true;
  id: number;
}