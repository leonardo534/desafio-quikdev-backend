import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment> {
    const result = await this.commentRepository.findOne({
      where: { id: id },
      loadRelationIds: {
        relations: ['user'],
        disableMixedMap: true,
      },
    });
    return result;
  }

  async create(
    params: Partial<Comment>,
    post: Post,
    user: User,
  ): Promise<number> {
    const result = await this.commentRepository.insert({
      ...params,
      post: post,
      userId: user.id,
    });
    return result.identifiers?.[0]?.id;
  }

  async update(id: number, params: Partial<Comment>): Promise<boolean> {
    const result = await this.commentRepository.update(id, params);
    return Boolean(result);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.commentRepository.delete(id);
    return Boolean(result);
  }

  async findByPostId(postId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { post: { id: postId } },
    });
  }

  async findByUserId(userId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { userId: userId },
    });
  }
}
