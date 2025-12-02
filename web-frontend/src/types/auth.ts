export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role?: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CreateUserDto {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
