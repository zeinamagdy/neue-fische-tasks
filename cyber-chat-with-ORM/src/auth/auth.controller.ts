import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user as User);
  }
  @Post('logout')
  @ApiBearerAuth() // to run auth from swagger
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req) {
    // req.user contains { username: string, sub: string } from your JWT strategy
    return {
      success: true,
      message: `User ${req.user.username} logged out successfully`,
    };
  }
  @ApiBearerAuth() // to run auth from swagger
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getProfile(@Req() req) {
    const user = req.user;
    return user;
  }
}
