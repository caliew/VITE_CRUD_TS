import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma:PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto:AuthDto) { 
        // GENERATE THE PASSWORD HASH
        const hash = await argon.hash(dto.password);
        // SAVE THE NEW USER IN THE DATABASE
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                }
            })
            // RETURN THE SAVED USER
            delete user.hash;
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    
    async signin(dto:AuthDto) { 
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        // if user does not exist throw exception
        if (!user) throw new ForbiddenException('Credentials incorrect');
        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password
        );
        // if password incorrect throw exception
        if (!pwMatches) throw new ForbiddenException('Credential incorrect');
        // send back the user
        delete user.hash;
        return this.signToken(user.id,user.email);
    }

    async signToken(userId:number, email:string): Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email: email
        }
        const secret = await this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(
            payload, 
            {
            secret: secret,
            expiresIn: '1h'
        });
        return {
            access_token: token
        }
    }
}
