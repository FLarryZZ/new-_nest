import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { create } from 'domain';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}
    async findOnebyId(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id});
    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashed = await bcrypt.hash(createUserDto.password, 10);
        const data = {... createUserDto, password: hashed };
        const newUser = this.usersRepository.create(data);
        return this.usersRepository.save(newUser);
    }
    async findOnebyEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({email});
    }
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }


    async delete(id:number) : Promise<DeleteResult>{
        return  this.usersRepository.delete(id);
    }

    async update(UpdateUserDto:UpdateUserDto,id:number){
        try {
            const user=await this.findOnebyId(id)
            for (const key in UpdateUserDto) {
                user[key]=UpdateUserDto[key];

            }
            return await this.usersRepository.save(user);
        } catch (error) {
            throw new NotFoundException('User not found ')
        }

    }
}
