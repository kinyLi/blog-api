import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User{
  username: string,
  password: string
}

@Injectable()
export class JwtUtil {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async createToken(user: User, expiration?: number | string):Promise<string> {
    const payload = {
      username: user.username,
      password: user.password
    }
    return await this.jwtService.sign(payload, {
      expiresIn: expiration
    })
  }
}