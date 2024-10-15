import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/data-source';
import { CategoriesModule } from './categories/category.module';
import { SeedsModule } from './seeds/seeds.module';
import { OrdersModule } from './order/order.module';
import { OrderDetailsModule } from './orderDetails/orderDetail.module';
import { FilesModule } from './file/file.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')
    }),
    UserModule, 
    ProductModule, 
    AuthModule,
    CategoriesModule,
    SeedsModule,
    OrdersModule,
    OrderDetailsModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h'},
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
