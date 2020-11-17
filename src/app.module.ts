import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckToken } from './middleware/checkToken.middleware';

import { UtilsModule } from './utils/util.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-blog'),
    UserModule,
    UtilsModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CheckToken)
      .forRoutes('user')
  }
}
