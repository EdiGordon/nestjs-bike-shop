import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AuthMiddleware } from '../user/auth.middleware';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { BikeController } from './bike.controller';
import { BikeService } from './bike.service';
import { Bike } from './bike.entity';

@Module({
  controllers: [
    BikeController,
  ],
  exports: [],
  imports: [MikroOrmModule.forFeature({ entities: [Bike] }), BikeModule, UserModule],
  providers: [BikeService],
})
export class BikeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'bike/:username/follow', method: RequestMethod.ALL });
  }
}
