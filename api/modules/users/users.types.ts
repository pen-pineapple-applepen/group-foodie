export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  guest: boolean;
}

export interface Friend {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  guest: boolean;
}

export interface Credentials {
  hasCorrectCredentials: boolean;
  id: number;
}