import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {Exclude} from "class-transformer";

export class UpdateUserDto {

    @IsString() @IsOptional()
    first_name?: string;

    @IsString() @IsOptional()
    last_name?: string;



}