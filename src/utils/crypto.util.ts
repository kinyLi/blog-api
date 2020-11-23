import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';


const saltRounds = 10;

@Injectable()
export class CryptoUtil {

  /**
   * 加密密码
   * @param password 密码
   */
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * 校验密码
   * @param password 密码
   * @param encryptedPassword 加密密码
   */
  async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, encryptedPassword);
    return !!result;
  }
}