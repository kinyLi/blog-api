import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtUtil } from '../utils/jwt.util';

// token验证中间件 TODO: 加入用户信息返回
@Injectable()
export class CheckToken implements NestMiddleware {
  constructor(private readonly jwtUtil: JwtUtil) {

  }
  async use(req: Request, res: Response, next: Function):Promise<any> {
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