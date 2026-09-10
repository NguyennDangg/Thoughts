import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const validUsername = this.config.get('ADMIN_USERNAME');
    const passwordHash = this.config.get('ADMIN_PASSWORD_HASH') as string;

    if (username !== validUsername) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ username });
    return { access_token: token };
  }
}
