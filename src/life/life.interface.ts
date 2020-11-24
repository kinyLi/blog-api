export interface Result<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}
