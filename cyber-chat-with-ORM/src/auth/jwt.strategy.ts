import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  username: string;
}
//run after login and getting the token
// GET /users/profile
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const key = configService.get<string>('JWT_SECRET');
    if (!key)
      throw new Error('JWT_SECRET environment variable is not defined!');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: key,
    });
  }
//overide the validate function in passportStrategy
  async validate(payload:JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
