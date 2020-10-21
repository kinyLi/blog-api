export interface UserResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
}