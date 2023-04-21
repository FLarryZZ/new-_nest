import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from 'src/entities/user.entity';
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]),JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService,LocalStrategy]
})
export class AuthModule {}
