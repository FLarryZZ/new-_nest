import {IsEmail, IsNotEmpty,IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString() @IsNotEmpty()
    first_name: string

    @IsString() @IsNotEmpty()
    last_name: string

    @IsString() @MinLength(8) @MaxLength(32)
    password: string

}