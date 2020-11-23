import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LifeSchema, Life } from './life.schema';
import { LifeController } from './life.controller';
import { LifeService } from './life.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Life.name, schema: LifeSchema}])
  ],
  controllers: [LifeController],
  providers: [LifeService]
})
export class LifeModule {}