import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comment: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto, username: string) {
    const comment = { ...createCommentDto, author: username };
    return await this.comment.save(comment);
  }

  findAllByusername(username: string) {
    return this.comment.find({ where: { author: username } });
  }

  findOne(id: string) {
    return this.comment.findOneBy({ id });
  }

  findAllByThreadId(threadId: string, author: string) {
    return this.comment.find({ where: { threadId, author } });
  }
  update(id: string, author: string, updateCommentDto: UpdateCommentDto) {
    return this.comment.update({ id, author: author }, updateCommentDto);
  }

  remove(id: string, author: string) {
    return this.comment.delete({ id, author });
  }
}
