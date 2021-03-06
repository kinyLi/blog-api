export interface Result<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface UserInfo {
  name?: string,
  sex?: number, // 0 girl / 1 boy
  age?: number,
  email?: string,
  phone?: number,
  nick?: string
}

export interface UserGetInfo {
  username?: string,
  accessToken?: string,
  userInfo?: UserInfo,
}