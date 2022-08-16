import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() params: { username: string; password: string },
    @Res() res: Response,
  ) {
    const payload = await this.authService.login(
      params.username,
      params.password,
    );
    res.status(HttpStatus.OK).json(payload);
  }

  @Get('/me')
  async me(@Headers('Authorization') auth: string, @Res() res: Response) {
    try {
      const user = await this.authService.me(auth?.replace('Bearer ', ''));
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: e.message,
      });
    }
  }
}
