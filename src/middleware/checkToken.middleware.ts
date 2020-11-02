import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class CheckToken implements NestMiddleware {
  constructor(private readonly jwtUtil: JwtUtil) {

  }
  async use(req: Request, res: Response, next: Function): Promise<void> {
    const body = req.body && req.body || null;
    let resultCode = 0
    if(body.accessToken) {
      resultCode = await this.jwtUtil.checkToken(body);
      if(resultCode !== 0) {
        throw new HttpException('登录成功过', 200)
        next();
      }
      throw new HttpException('登录失败', 0)
      return;
    }
      next();
  }
}