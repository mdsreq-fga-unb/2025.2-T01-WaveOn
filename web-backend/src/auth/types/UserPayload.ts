export interface UserPayload {
  sub: string;
  email: string;
  role: 'USER' | 'ADMIN';
}
