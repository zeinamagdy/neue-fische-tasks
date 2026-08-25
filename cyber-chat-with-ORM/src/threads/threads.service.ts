import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './entities/thread.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly thread: Repository<Thread>,

    @InjectRepository(Comment)
    private readonly comment: Repository<Comment>,
  ) {}

  create(createThreadDto: CreateThreadDto, author: string) {
    const thread = { ...createThreadDto, author: author };
    return this.thread.save(thread);
  }

  findAll() {
    return this.thread.find();
  }

  findOne(id: string) {
    return this.thread.findOneBy({ id });
  }

  update(id: string, author: string, updateThreadDto: UpdateThreadDto) {
    return this.thread.update({ id, author }, updateThreadDto);
  }

  remove(id: string) {
    return this.thread.delete(id);
  }

  addComment(createCommentDto: CreateCommentDto, threadId: string) {
    console.log('id in services', threadId);
    const comment = this.comment.create({
      ...CreateCommentDto,
      threadId, // foreign key reference
    });
    return this.comment.save(comment);
  }
}
