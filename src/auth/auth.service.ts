import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
    constructor(private usersService: UserService,
                private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOnebyEmail(email);
        if (!user) {
            throw new NotFoundException("Back to the lobby my G");
        }
        if (!(await bcrypt.compare(pass, user.password))) {
            throw new BadRequestException("Pass mismatch");
        }
        const payload = {
            "email": user.email,
            "sub": user.id
        }
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }

}
