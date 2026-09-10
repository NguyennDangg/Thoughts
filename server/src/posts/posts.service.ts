import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(dto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(dto);
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: { images: true },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: { images: true },
    });
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, dto);
    return this.findOne(id) as Promise<Post>;
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
