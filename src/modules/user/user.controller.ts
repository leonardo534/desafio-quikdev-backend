import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  show() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() params: Partial<User>) {
    return this.userService.create(params);
  }

  @Put(':id')
  update(@Param("id") id: number, @Body() params: Partial<User>) {
    return this.userService.update(id, params);
  }

  @Delete(':id')
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
