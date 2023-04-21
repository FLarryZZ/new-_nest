import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from 'src/entities/user.entity';
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]),ConfigModule.forRoot(),
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
