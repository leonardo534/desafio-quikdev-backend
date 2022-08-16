import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findById(id: number): Promise<Post> {
    const result = await this.postRepository.find({
      where: { id: id },
      loadRelationIds: {
        relations: ['user'],
        disableMixedMap: true,
      },
    });

    return result.length ? result?.[0] : null;
  }

  async create(params: Partial<Post>, user: User): Promise<number> {
    const result = await this.postRepository.insert({ ...params, user });
    return result.identifiers?.[0]?.id;
  }

  async update(id: number, params: Partial<Post>): Promise<boolean> {
    const result = await this.postRepository.update(id, params);
    return Boolean(result);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    return Boolean(result);
  }

  async findByUserId(userId: number): Promise<Post[]> {
    return await this.postRepository.find({ where: { user: { id: userId } } });
  }
}
