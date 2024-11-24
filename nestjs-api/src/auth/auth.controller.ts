import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signin(@Body() dto: AuthDto) {
        return this.authService.signup(dto) 
    }


    @Post('signin')
    signip(@Body() dto:SignupDto) { 
        return this.authService.signin(dto) 
    }
}
