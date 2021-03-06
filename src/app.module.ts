import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckToken } from './middleware/checkToken.middleware';

import { UtilsModule } from './utils/util.module';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { AppController } from './app.controller';
import { SettingModule } from './modules/setting/setting.module';
import { LifeModule } from './modules/life/life.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-blog'),
    UserModule,
    UtilsModule,
    SettingModule,
    ArticleModule,
    LifeModule
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
