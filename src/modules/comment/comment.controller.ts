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
import { PostService } from '../post/post.service';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private postService: PostService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async show() {
    return this.commentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param("id") id: number) {
    return await this.commentService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() params: Partial<Comment> & { postId: number },
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const post = await this.postService.findById(params.postId);
    return await this.commentService.create(params, post, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param("id") id: number,
    @Body() params: Partial<Comment>, 
    @Headers('Authorization') auth: string,
  ) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const comment = await this.commentService.findById(id);
    console.log(comment)
    if (comment.userId !== user.id) {
      throw new UnauthorizedException();
    }

    return await this.commentService.update(id, params);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param("id") id: number, @Headers('Authorization') auth: string) {
    const user = await this.authService.me(auth?.replace('Bearer ', ''));
    const comment = await this.commentService.findById(id);

    if (comment.userId !== user.id) {
      throw new UnauthorizedException();
    }

    return await this.commentService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/post/:postId')
  async findByPostId(@Param('postId') postId: number) {
    return await this.commentService.findByPostId(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: number) {
    return await this.commentService.findByUserId(userId);
  }
}
