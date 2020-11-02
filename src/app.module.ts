import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CheckToken } from './middleware/checkToken.middleware';
import { UtilsModule } from './utils/util.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-blog'),
    UserModule,
    UtilsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CheckToken)
      .forRoutes('user')
  }
}
