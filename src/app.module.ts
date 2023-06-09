import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import * as process from "process";


@Module({
  imports: [ ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities:true,
      entities:[],
      synchronize: true,
    }),

      UserModule,
    DatabaseModule,
    CategoriesModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
