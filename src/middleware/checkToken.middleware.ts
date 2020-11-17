import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtUtil } from '../utils/jwt.util';

// token验证中间件
@Injectable()
export class CheckToken implements NestMiddleware {
  constructor(private readonly jwtUtil: JwtUtil) {

  }
  async use(req: Request, res: Response, next: (() => void)):Promise<void> {
    const body = req.body && req.body || null;
    if(body.accessToken) {
      const resultCode = await this.jwtUtil.checkToken(body);
      if(resultCode !== 200) {
        throw new HttpException('未授权', resultCode)
      }
    }
    next();
  }
}