import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as multipart from 'connect-multiparty';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';
import * as path from 'path';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // cors跨域处理 暂不配置可访问
  app.enableCors()
  // 开启全局管道
  app.useGlobalPipes(new ValidationPipe())
  // 解除express post大小限制
  app.use(bodyParser.json({"limit":'10000kb'}))
  // 解析form-data
  app.use(multipart())

  // 映射静态资源路径
  app.use('/image',serveStatic(path.join(__dirname,'./upload'), {
    maxAge: '1d', // 缓存最大时间
    extensions:['jpg', 'jpeg', 'png', 'gif'], //文件格式
  }))

  app.use('/setting/image',serveStatic(path.join(__dirname,'./setting/upload'), {
    maxAge: '1d', // 缓存最大时间
    extensions:['jpg', 'jpeg', 'png', 'gif'], //文件格式
  }))

  app.use('/life/image',serveStatic(path.join(__dirname,'./life/upload'), {
    maxAge: '1d', // 缓存最大时间
    extensions:['jpg', 'jpeg', 'png', 'gif'], //文件格式
  }))

  // csrf跨站请求攻击 暂不配置
  // app.use(csurf());

  // swagger 配置
  const options = new DocumentBuilder()
    .setTitle('blog-api')
    .setDescription('blog Api 接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(5000);
}
bootstrap();
