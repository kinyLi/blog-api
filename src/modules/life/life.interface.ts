export interface Result<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface FileItem {
  url: string,
  name: string
}