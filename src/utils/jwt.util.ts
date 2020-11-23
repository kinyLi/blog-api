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
    return this.jwtService.sign(payload, {
      expiresIn: expiration,
      secret: secret
    })
  }

  /**
   *
   * @param user 用户登录信息
   */
  async checkToken(user: User): Promise<number> {
    // token验证过程成功正常执行,失败会导致程序异常，需要使用try/catch
    try {
      const result = this.jwtService.verify(user.accessToken, {
        secret: secret
      });
      if(result) {
        return 200;
      }
    } catch(err) {
      return 0;
    }
  }
}