import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(
    private postService: PostService,
    private authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async show() {
    return await this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param("id") id: number) {
    return await this.postService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() params: Partial<PostEntity>,
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    return await this.postService.create(params, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param("id") id: number,
    @Body() params: Partial<PostEntity>,
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const post = await this.postService.findById(id);

    if (post.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return await this.postService.update(id, params);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param("id") id: number, @Headers('Authorization') auth: string) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const post = await this.postService.findById(id);

    if (post.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return await this.postService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async showByUser(@Param() userId: number) {
    return await this.postService.findByUserId(userId);
  }
}
