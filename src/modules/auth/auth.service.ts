import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(username: string, password: string) {
    try {
      const user = await this.userService.login(username, password);

      return {
        user: user,
        access_token: this.jwtService.sign({ ...user }),
        expiresIn: 3600,
      };   
    } catch (e) {
      throw new UnauthorizedException
    }
  }

  async me(token: string) {
    if (!token) {
      throw new Error('Token não enviado!');
    }

    const user: User = this.jwtService.decode(token) as User;

    if (!user) {
      throw new Error('Token inválido');
    }

    return user;
  }

  async isAuthenticated(token: string) {
    try {
      await this.me(token);
      return true;
    } catch {
      return false;
    }
  }
}
