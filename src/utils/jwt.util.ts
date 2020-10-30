import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User{
  username: string,
  password: string,
  accessToken?: string
}
const secret = 'ok,let\'s go G2';
@Injectable()
export class JwtUtil {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  /**
   * 生成token
   * @param user 用户信息
   * @param expiration token时效
   */
  async createToken(user: User, expiration?: number | string):Promise<string> {
    const payload = {
      username: user.username,
      password: user.password
    }
    return await this.jwtService.sign(payload, {
      expiresIn: expiration,
      secret: secret
    })
  }

  async checkToken(user: User): Promise<number> {
    try {
      const result = this.jwtService.verify(user.accessToken, {
        secret: secret
      });
      if(result) {
        return 200;
      }
    } catch(err) {
      const massage = 0;
      return massage;
    }
  }
}