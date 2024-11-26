import { Controller, Post, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto) 
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto:SignupDto) { 
        return this.authService.signin(dto) 
    }
}
