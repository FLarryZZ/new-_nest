import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import {User} from "../entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserService } from './user.service';
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
