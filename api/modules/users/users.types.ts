export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  guest: boolean;
}

export interface CheckCredentials {
  hasCorrectCredentials: boolean;
  id: number;
}