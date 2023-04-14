import {Controller, Get, Post, Patch, Body, Param, Delete} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "../entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {DeleteResult} from "typeorm";

@Controller('users')
export class UserController {
    constructor(private readonly userServices: UserService){

    }
@Get()
findAll(): Promise<User[]>{
    return this.userServices.findAll();
}
@Get(':id')
async findOneUser(@Param('id') id:number) :Promise<User>{
        return this.userServices.findOnebyId(id);
}
@Post()
    async create(@Body() createUserDto: CreateUserDto):Promise<User>{
        return this.userServices.create(createUserDto);
}
@Delete(':id')
    async delete(@Param('id') id:number) :Promise<DeleteResult>{
        return this.userServices.delete(id);
}
    @Patch(':id')
    async update(@Body()updateuserdto:UpdateUserDto,@Param('id') id:number):Promise<User>{
        return await this.userServices.update(updateuserdto,id);
    }

}
