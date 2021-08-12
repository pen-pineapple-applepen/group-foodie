export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  guest: boolean;
}

export interface Credentials {
  hasCorrectCredentials: boolean;
  id: number;
}

export interface EmailsThatMatchPassword {
  id: number;
  email: string;
}
