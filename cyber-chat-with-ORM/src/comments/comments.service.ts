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
  async create(createCommentDto: CreateCommentDto) {
    return await this.comment.save(createCommentDto);
  }

  findAll() {
    return this.comment.find();
  }

  findOne(id: string) {
    return this.comment.findOneBy({ id });
  }

  findAllByThreadId(threadId: string) {
    return this.comment.find({ where: { threadId } });
  }
  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.comment.update(id, updateCommentDto);
  }

  remove(id: string) {
    return this.comment.delete(id);
  }
}
