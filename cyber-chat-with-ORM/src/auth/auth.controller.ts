import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user as User);
  }
  @ApiBearerAuth()// to run auth from swagger
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getProfile(@Req() req) {
    const user = req.user;
    return user;
  }
}
