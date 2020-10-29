import { Module } from '@nestjs/common';

import { CryptoUtil } from './crypto.util';
import { JwtUtil } from './jwt.util';
import { JwtModule  } from '@nestjs/jwt';
/**
 * 公共模块，向 nest 容器提供单例的公共模块，其他模块使用公共模块导出的 provider 时，只需导入 CommonModule
 */
@Module({
    imports: [JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '8h' }, // token 过期时效
    })],
    providers: [CryptoUtil, JwtUtil],
    exports: [CryptoUtil, JwtUtil]
})
export class UtilsModule { }