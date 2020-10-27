export interface UserResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
}

export interface UserInfo {
  name: string,
  sex: number, // 0 girl / 1 boy
  age: number,
  email: string,
  phone: number,
}