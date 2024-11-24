import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signin(@Body() dto: AuthDto) {
        return this.authService.signup() 
    }


    @Post('signin')
    signip(@Body() dto:SignupDto) { 
        console.log(dto);
        return this.authService.signin() 
    }
}
